import { ILoadCompanies } from '@/src/usecases/boundaries/input/company/load-companies'
import { ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController } from '../../protocols'

export class LoadCompaniesController implements IController {
  constructor (
    private readonly loadCompanies: ILoadCompanies
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { filter, page } = httpRequest.query
      const companies = await this.loadCompanies.load(filter, page)
      return ok(companies)
    } catch (error) {
      return serverError(error)
    }
  }
}
