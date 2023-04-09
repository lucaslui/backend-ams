import { ILoadCompanyById } from '@/src/usecases/boundaries/input/company/load-company-by-id'
import { notFound, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadCompanyByIdController implements IController {
  constructor (
    private readonly loadCompanyById: ILoadCompanyById
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { companyId } = httpRequest.params
      const result = await this.loadCompanyById.loadById({ companyId })
      if (result.isLeft()) {
        return notFound(result.value)
      }
      return ok(result.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
