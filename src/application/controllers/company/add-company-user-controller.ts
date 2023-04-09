import { IAddCompanyUser } from '@/src/usecases/boundaries/input/company/add-company-user'
import { badRequest, noContent, serverError } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IController, IValidation } from '../../protocols'

export class AddCompanyUserController implements IController {
  constructor (
    private readonly addCompanyUser: IAddCompanyUser,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { companyId } = httpRequest.params
      const { name, email } = httpRequest.body
      const result = await this.addCompanyUser.add({ companyId, name, email })
      if (result.isLeft()) {
        return badRequest(result.value)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
