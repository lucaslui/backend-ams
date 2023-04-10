import { ICheckUserAuthentication } from '@/src/usecases/boundaries/input/auth/check-user-authentication'
import { badRequest, unauthorized, ok, serverError } from '../../helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '../../protocols'

export class UserLoginController implements IController {
  constructor (
    private readonly authentication: ICheckUserAuthentication,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const result = await this.authentication.auth({
        email,
        password
      })
      if (result.isLeft()) {
        return unauthorized()
      }
      return ok(result.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
