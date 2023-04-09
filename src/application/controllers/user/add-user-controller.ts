import { IAddUser } from '@/src/usecases/boundaries/input/user/add-user'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class AddUserController implements IController {
  constructor (
    private readonly addUser: IAddUser,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { companyId } = httpRequest
      const { name, email, role } = httpRequest.body

      const result = await this.addUser.add({ name, email, role, companyId })

      if (result.isLeft()) {
        return badRequest(result.value)
      }

      return ok(result.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
