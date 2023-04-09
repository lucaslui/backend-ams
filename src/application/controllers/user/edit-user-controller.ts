import { IEditUser } from '@/src/usecases/boundaries/input/user/edit-user'
import { badRequest, notFound, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class EditUserController implements IController {
  constructor (
    private readonly editUser: IEditUser,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { companyId } = httpRequest
      const { userId } = httpRequest.params
      const { name, email, role } = httpRequest.body

      const result = await this.editUser.edit({
        companyId,
        userId,
        name,
        email,
        role
      })

      if (result.isLeft()) {
        return notFound(result.value)
      }
      return ok(result.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
