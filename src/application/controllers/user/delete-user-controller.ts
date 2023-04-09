import { IDeleteUser } from '@/src/usecases/boundaries/input/user/delete-user'
import { noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class DeleteUserController implements IController {
  constructor (
    private readonly deleteUser: IDeleteUser
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { companyId } = httpRequest
      const { userId } = httpRequest.params
      const result = await this.deleteUser.delete({
        companyId,
        userId
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
