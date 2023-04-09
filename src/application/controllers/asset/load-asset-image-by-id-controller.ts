import { ILoadAssetImageById } from '@/src/usecases/boundaries/input/asset/load-asset-image-by-id'
import { notFound, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadAssetImageByIdController implements IController {
  constructor (
    private readonly loadAssetImageById: ILoadAssetImageById
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { companyId } = httpRequest
      const { imageId } = httpRequest.params

      const image = await this.loadAssetImageById.load({ companyId, imageId })

      if (!image) {
        return notFound(new Error('Image not found'))
      }

      return ok(image)
    } catch (error) {
      return serverError(error)
    }
  }
}
