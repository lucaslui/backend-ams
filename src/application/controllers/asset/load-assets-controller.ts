import { ILoadAssets } from '@/src/usecases/boundaries/input/asset/load-assets'
import { ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadAssetsController implements IController {
  constructor (
    private readonly loadAssets: ILoadAssets
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { companyId } = httpRequest
      const { filter, page } = httpRequest.query

      const assets = await this.loadAssets.load({ companyId, filter, page })

      return ok(assets)
    } catch (error) {
      return serverError(error)
    }
  }
}
