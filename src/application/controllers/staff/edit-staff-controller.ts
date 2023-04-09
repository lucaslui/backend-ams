import { IEditStaff } from '@/src/usecases/boundaries/input/staff/edit-staff'
import { badRequest, notFound, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class EditStaffController implements IController {
  constructor (
    private readonly editStaff: IEditStaff,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { staffId } = httpRequest.params
      const { name, email } = httpRequest.body

      const result = await this.editStaff.edit({ staffId, name, email })

      if (result.isLeft()) {
        return notFound(result.value)
      }
      return ok(result.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
