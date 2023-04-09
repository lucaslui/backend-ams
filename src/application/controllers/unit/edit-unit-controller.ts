import { IEditUnit } from '@/src/usecases/boundaries/input/unit/edit-unit'
import { badRequest, notFound, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class EditUnitController implements IController {
  constructor (
    private readonly editUnit: IEditUnit,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { companyId } = httpRequest
      const { unitId } = httpRequest.params
      const { name, address } = httpRequest.body
      const result = await this.editUnit.edit({
        companyId,
        unitId,
        name,
        address
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
