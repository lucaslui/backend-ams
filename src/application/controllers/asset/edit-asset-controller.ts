import { IEditAsset } from '@/src/usecases/boundaries/input/asset/edit-asset'
import { badRequest, notFound, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class EditAssetController implements IController {
  constructor (
    private readonly editAsset: IEditAsset,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { companyId } = httpRequest
      const { assetId } = httpRequest.params
      const { name, description, model, owner, status, health } = httpRequest.body

      const result = await this.editAsset.edit({
        companyId,
        assetId,
        name,
        description,
        model,
        owner,
        status,
        health
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
