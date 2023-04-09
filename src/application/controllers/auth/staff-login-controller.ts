import { ICheckStaffAuthentication } from '@/src/usecases/boundaries/input/auth/check-staff-authentication'
import { HttpRequest, HttpResponse } from '@/src/usecases/boundaries/output/gateways/http/http-client'
import { badRequest, unauthorized, ok, serverError } from '../../helpers/http-helper'
import { IController, IValidation } from '../../protocols'

export class StaffLoginController implements IController {
  constructor (
    private readonly checkStaffAuthentication: ICheckStaffAuthentication,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const result = await this.checkStaffAuthentication.auth({
        email,
        password
      })
      if (result.isLeft()) {
        return unauthorized()
      }
      return ok({ accessToken: result.value })
    } catch (error) {
      return serverError(error)
    }
  }
}
