import { IDeleteStaff } from '@/src/usecases/boundaries/input/staff/delete-staff'
import { noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class DeleteStaffController implements IController {
  constructor (
    private readonly deleteStaff: IDeleteStaff
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { staffId } = httpRequest.params
      const result = await this.deleteStaff.delete({ staffId })
      if (result.isLeft()) {
        return notFound(result.value)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
