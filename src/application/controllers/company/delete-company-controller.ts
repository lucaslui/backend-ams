import { IDeleteCompany } from '@/src/usecases/boundaries/input/company/delete-company'
import { noContent, notFound, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class DeleteCompanyController implements IController {
  constructor (
    private readonly deleteCompany: IDeleteCompany
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { companyId } = httpRequest.params
      const result = await this.deleteCompany.delete({ companyId })
      if (result.isLeft()) {
        return notFound(result.value)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
