
import { ok, serverError } from '@/src/application/helpers/http-helper'
import { StaffAuthorizationMiddleware } from '@/src/application/middlewares/staff-authorization-middleware'
import { IHttpRequest } from '@/src/application/protocols'
import { right } from '@/src/shared/either'
import { CheckStaffTokenParams, CheckStaffTokenReturn, ICheckStaffToken } from '@/src/usecases/boundaries/input/auth/check-staff-token'

import { faker } from '@faker-js/faker'

const throwError = (): never => {
  throw new Error()
}

const mockRequest = (): IHttpRequest => ({
  headers: {
    'x-access-token': 'any_user_id'
  }
})

type SutTypes = {
  sut: StaffAuthorizationMiddleware
  checkStaffToken: CheckUserTokenAndAuthorizationStub
}

export class CheckUserTokenAndAuthorizationStub implements ICheckStaffToken {
  params: CheckStaffTokenParams
  async check (params: CheckStaffTokenParams): Promise<CheckStaffTokenReturn> {
    this.params = params
    return right({
      id: 'any_user_id',
      name: faker.random.word(),
      email: faker.random.word(),
      password: faker.random.word(),
      companyId: faker.random.word(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    })
  }
}

const makeSut = (): SutTypes => {
  const checkStaffToken = new CheckUserTokenAndAuthorizationStub()
  const sut = new StaffAuthorizationMiddleware(checkStaffToken)
  return {
    sut,
    checkStaffToken
  }
}

describe('StaffAuthorizationMiddleware Middleware', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'cancel'
  })

  test('Should return 200 on StaffAuthorizationMiddleware success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ userId: 'any_user_id' }))
  })

  test('Should return 500 if StaffAuthorizationMiddleware throws', async () => {
    const { sut, checkStaffToken } = makeSut()
    jest.spyOn(checkStaffToken, 'check').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call StaffAuthorizationMiddleware with correct values', async () => {
    const { sut, checkStaffToken } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(checkStaffToken.params).toEqual({ accessToken: httpRequest.headers['x-access-token'] })
  })
})
