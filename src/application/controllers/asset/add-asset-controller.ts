import { IAddAsset } from '@/src/usecases/boundaries/input/asset/add-asset'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class AddAssetController implements IController {
  constructor (
    private readonly addAsset: IAddAsset,
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
      const { name, description, model, owner, status, health } = httpRequest.body

      const result = await this.addAsset.add({ companyId, unitId, name, description, model, owner, status, health })

      if (result.isLeft()) {
        return forbidden(result.value)
      }

      return ok(result.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
