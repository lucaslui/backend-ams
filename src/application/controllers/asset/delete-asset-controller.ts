import { IDeleteAsset } from '@/src/usecases/boundaries/input/asset/delete-asset'
import { noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class DeleteAssetController implements IController {
  constructor (
    private readonly deleteAsset: IDeleteAsset
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { companyId } = httpRequest
      const { assetId } = httpRequest.params
      const result = await this.deleteAsset.delete({
        companyId,
        assetId
      })
      if (result.isLeft()) {
        return notFound(result.value)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
