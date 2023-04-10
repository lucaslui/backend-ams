
import { StaffLoginController } from '@/src/application/controllers/auth/staff-login-controller'
import { UnauthorizedError } from '@/src/application/errors'
import { badRequest, ok, serverError, unauthorized } from '@/src/application/helpers/http-helper'
import { IHttpRequest, IValidation } from '@/src/application/protocols'
import { left, right } from '@/src/shared/either'
import { CheckStaffAuthenticationParams, CheckStaffAuthenticationReturn, ICheckStaffAuthentication } from '@/src/usecases/boundaries/input/auth/check-staff-authentication'

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
  sut: StaffLoginController
  checkStaffAuthentication: CheckStaffAuthenticationStub
  validation: ValidationStub
}

export class CheckStaffAuthenticationStub implements ICheckStaffAuthentication {
  params: CheckStaffAuthenticationParams
  async auth (params: CheckStaffAuthenticationParams): Promise<CheckStaffAuthenticationReturn> {
    this.params = params
    const accessToken = 'any_token'
    return right(accessToken)
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
  const checkStaffAuthentication = new CheckStaffAuthenticationStub()
  const validation = new ValidationStub()
  const sut = new StaffLoginController(checkStaffAuthentication, validation)
  return {
    sut,
    checkStaffAuthentication,
    validation
  }
}

describe('StaffLoginController Controller', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'cancel'
  })

  test('Should return 200 on StaffLoginController success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should return 500 if StaffLoginController throws', async () => {
    const { sut, checkStaffAuthentication } = makeSut()
    jest.spyOn(checkStaffAuthentication, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call StaffLoginController with correct values', async () => {
    const { sut, checkStaffAuthentication } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(checkStaffAuthentication.params).toEqual({ email: 'any_email', password: 'any_password' })
  })

  test('Should return 400 if "email" is missed in StaffLoginController call', async () => {
    const { sut, validation } = makeSut()
    const { email, ...mockRequestWithoutEmail } = mockRequest().body
    jest.spyOn(validation, 'validate').mockImplementationOnce(() => new Error())
    const httpResponse = await sut.handle({ body: mockRequestWithoutEmail })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should return 400 if "name" is missed in StaffLoginController call', async () => {
    const { sut, validation } = makeSut()
    const { name, ...mockRequestWithoutName } = mockRequest().body
    jest.spyOn(validation, 'validate').mockImplementationOnce(() => new Error())
    const httpResponse = await sut.handle({ body: mockRequestWithoutName })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should return 401 when StaffLoginController receive a user unauthorized request', async () => {
    const { sut, checkStaffAuthentication } = makeSut()
    jest.spyOn(checkStaffAuthentication, 'auth').mockImplementationOnce(async () => Promise.resolve(left(new UnauthorizedError())))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })
})
