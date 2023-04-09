import { IAddStaff } from '@/src/usecases/boundaries/input/staff/add-staff'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class AddStaffController implements IController {
  constructor (
    private readonly addStaff: IAddStaff,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email } = httpRequest.body

      const result = await this.addStaff.add({ name, email })

      if (result.isLeft()) {
        return forbidden(result.value)
      }

      return ok(result.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
