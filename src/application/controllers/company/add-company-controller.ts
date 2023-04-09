import { IAddCompany } from '@/src/usecases/boundaries/input/company/add-company'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class AddCompanyController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addCompany: IAddCompany
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, cnpj } = httpRequest.body
      const result = await this.addCompany.add({ name, cnpj })
      if (result.isLeft()) {
        return badRequest(result.value)
      }
      return ok(result.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
