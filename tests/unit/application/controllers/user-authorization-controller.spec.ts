
import { UserLoginController } from '@/src/application/controllers/auth/user-login-controller'
import { UnauthorizedError } from '@/src/application/errors'
import { badRequest, ok, serverError, unauthorized } from '@/src/application/helpers/http-helper'
import { IHttpRequest, IValidation } from '@/src/application/protocols'
import { left, right } from '@/src/shared/either'
import { ICheckUserAuthentication, CheckUserAuthenticationParams, CheckUserAuthenticationReturn } from '@/src/usecases/boundaries/input/auth/check-user-authentication'

const throwError = (): never => {
  throw new Error()
}

const mockRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email',
    password: 'any_password'
  }
})

type SutTypes = {
  sut: UserLoginController
  checkUserAuthentication: CheckUserAuthenticationStub
  validation: ValidationStub
}

export class CheckUserAuthenticationStub implements ICheckUserAuthentication {
  params: CheckUserAuthenticationParams
  async auth (params: CheckUserAuthenticationParams): Promise<CheckUserAuthenticationReturn> {
    this.params = params
    const accessToken = 'any_token'
    const companyId = 'any_company_id'
    return right({ accessToken, companyId })
  }
}

export class ValidationStub implements IValidation {
  error: Error = null
  input: any
  validate (input: any): Error {
    this.input = input
    return this.error
  }
}

const makeSut = (): SutTypes => {
  const checkUserAuthentication = new CheckUserAuthenticationStub()
  const validation = new ValidationStub()
  const sut = new UserLoginController(checkUserAuthentication, validation)
  return {
    sut,
    checkUserAuthentication,
    validation
  }
}

describe('UserLoginController Controller', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'cancel'
  })

  test('Should return 200 on UserLoginController success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token', companyId: 'any_company_id' }))
  })

  test('Should return 500 if UserLoginController throws', async () => {
    const { sut, checkUserAuthentication } = makeSut()
    jest.spyOn(checkUserAuthentication, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call UserLoginController with correct values', async () => {
    const { sut, checkUserAuthentication } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(checkUserAuthentication.params).toEqual({ email: 'any_email', password: 'any_password' })
  })

  test('Should return 400 if "email" is missed in UserLoginController call', async () => {
    const { sut, validation } = makeSut()
    const { email, ...mockRequestWithoutEmail } = mockRequest().body
    jest.spyOn(validation, 'validate').mockImplementationOnce(() => new Error())
    const httpResponse = await sut.handle({ body: mockRequestWithoutEmail })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should return 400 if "password" is missed in UserLoginController call', async () => {
    const { sut, validation } = makeSut()
    const { password, ...mockRequestWithoutPassword } = mockRequest().body
    jest.spyOn(validation, 'validate').mockImplementationOnce(() => new Error())
    const httpResponse = await sut.handle({ body: mockRequestWithoutPassword })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should return 401 when UserLoginController receive a user unauthorized request', async () => {
    const { sut, checkUserAuthentication } = makeSut()
    jest.spyOn(checkUserAuthentication, 'auth').mockImplementationOnce(async () => Promise.resolve(left(new UnauthorizedError())))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })
})
