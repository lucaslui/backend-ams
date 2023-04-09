import { IDeleteUnit } from '@/src/usecases/boundaries/input/unit/delete-unit'
import { noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class DeleteUnitController implements IController {
  constructor (
    private readonly deleteUnit: IDeleteUnit
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { companyId } = httpRequest
      const { unitId } = httpRequest.params
      const result = await this.deleteUnit.delete({
        companyId,
        unitId
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
