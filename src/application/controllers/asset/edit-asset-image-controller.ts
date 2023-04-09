import { badRequest, noContent, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'
import { IEditAssetImage } from '@/src/usecases/boundaries/input/asset/edit-asset-image'

export class EditAssetImageController implements IController {
  constructor (
    private readonly editAssetImage: IEditAssetImage
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const imageBinary = httpRequest.file

      if (!imageBinary) {
        return badRequest(new Error('Missing param: imageBinary'))
      }

      const { companyId } = httpRequest
      const { assetId } = httpRequest.params

      await this.editAssetImage.add({ companyId, assetId, imageBinary })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
