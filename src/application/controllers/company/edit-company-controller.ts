import { IEditCompany } from '@/src/usecases/boundaries/input/company/edit-company'
import { badRequest, notFound, ok, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class EditCompanyController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly editCompany: IEditCompany
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { companyId } = httpRequest.params
      const { name, cnpj } = httpRequest.body
      const result = await this.editCompany.edit({ name, cnpj }, companyId)
      if (result.isLeft()) {
        return notFound(result.value)
      }
      return ok(result.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
