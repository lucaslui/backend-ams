import { IAddUnit } from '@/src/usecases/boundaries/input/unit/add-unit'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class AddUnitController implements IController {
  constructor (
    private readonly addUnit: IAddUnit,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { companyId } = httpRequest
      const { name, address } = httpRequest.body
      const result = await this.addUnit.add({ companyId, name, address })

      if (result.isLeft()) {
        return forbidden(result.value)
      }

      return ok(result.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
