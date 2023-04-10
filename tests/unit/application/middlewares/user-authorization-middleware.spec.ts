
import { ok, serverError } from '@/src/application/helpers/http-helper'
import { UserAuthorizationMiddleware } from '@/src/application/middlewares/user-authorization-middleware'
import { IHttpRequest } from '@/src/application/protocols'
import { Role } from '@/src/entities/user'
import { right } from '@/src/shared/either'
import { CheckUserTokenAndAuthorizationParams, CheckUserTokenAndAuthorizationReturn, ICheckUserTokenAndAuthorization } from '@/src/usecases/boundaries/input/auth/check-user-token-and-authorization'

import { faker } from '@faker-js/faker'

const throwError = (): never => {
  throw new Error()
}

const mockRequest = (): IHttpRequest => ({
  headers: {
    'x-access-token': 'any_user_id',
    'x-company-id': 'any_company_id'
  }
})

type SutTypes = {
  sut: UserAuthorizationMiddleware
  checkUserTokenAndAuthorization: CheckUserTokenAndAuthorizationStub
  roles: Role[]
}

export class CheckUserTokenAndAuthorizationStub implements ICheckUserTokenAndAuthorization {
  params: CheckUserTokenAndAuthorizationParams
  async check (params: CheckUserTokenAndAuthorizationParams): Promise<CheckUserTokenAndAuthorizationReturn> {
    this.params = params
    return right({
      id: 'any_user_id',
      name: faker.random.word(),
      email: faker.random.word(),
      role: faker.random.word() as Role,
      password: faker.random.word(),
      companyId: faker.random.word(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    })
  }
}

const makeSut = (): SutTypes => {
  const checkUserTokenAndAuthorization = new CheckUserTokenAndAuthorizationStub()
  const roles: Role[] = ['admin']
  const sut = new UserAuthorizationMiddleware(checkUserTokenAndAuthorization, roles)
  return {
    sut,
    checkUserTokenAndAuthorization,
    roles
  }
}

describe('UserAuthorizationMiddleware Middleware', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'cancel'
  })

  test('Should return 200 on UserAuthorizationMiddleware success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ userId: 'any_user_id', companyId: 'any_company_id' }))
  })

  test('Should return 500 if UserAuthorizationMiddleware throws', async () => {
    const { sut, checkUserTokenAndAuthorization } = makeSut()
    jest.spyOn(checkUserTokenAndAuthorization, 'check').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call UserAuthorizationMiddleware with correct values', async () => {
    const { sut, checkUserTokenAndAuthorization, roles } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(checkUserTokenAndAuthorization.params).toEqual({ accessToken: httpRequest.headers['x-access-token'], roles })
  })
})
