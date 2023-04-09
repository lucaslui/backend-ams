import { ILoadStaffs } from '@/src/usecases/boundaries/input/staff/load-staffs'
import { ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadStaffsController implements IController {
  constructor (
    private readonly loadStaffs: ILoadStaffs
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { companyId } = httpRequest
      const { filter, page } = httpRequest.query

      const users = await this.loadStaffs.load({ companyId, filter, page })

      return ok(users)
    } catch (error) {
      return serverError(error)
    }
  }
}
