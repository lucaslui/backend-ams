import { ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'
import { ILoadAssetsByUnitId } from '@/src/usecases/boundaries/input/asset/load-assets-by-unit-id'

export class LoadAssetsByUnitIdController implements IController {
  constructor (
    private readonly loadAssetsByUnitId: ILoadAssetsByUnitId
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { companyId } = httpRequest
      const { unitId } = httpRequest.params
      const { filter, page } = httpRequest.query

      const assets = await this.loadAssetsByUnitId.load({ companyId, unitId, filter, page })

      return ok(assets)
    } catch (error) {
      return serverError(error)
    }
  }
}
