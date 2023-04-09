import { ILoadUsers } from '@/src/usecases/boundaries/input/user/load-users'
import { ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadUsersController implements IController {
  constructor (
    private readonly loadUsers: ILoadUsers
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { companyId } = httpRequest
      const { filter, page } = httpRequest.query

      const users = await this.loadUsers.load({ companyId, filter, page })

      return ok(users)
    } catch (error) {
      return serverError(error)
    }
  }
}
