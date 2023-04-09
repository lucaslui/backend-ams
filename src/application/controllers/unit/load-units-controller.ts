import { ILoadUnits } from '@/src/usecases/boundaries/input/unit/load-units'
import { ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadUnitsController implements IController {
  constructor (
    private readonly loadUnits: ILoadUnits
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { companyId } = httpRequest
      const { filter, page } = httpRequest.query

      const units = await this.loadUnits.load({ companyId, filter, page })

      return ok(units)
    } catch (error) {
      return serverError(error)
    }
  }
}
