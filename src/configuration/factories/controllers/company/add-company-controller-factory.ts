import { AddCompanyController } from '@/src/application/controllers/company/add-company-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddCompany } from '../../usecases/company/add-company-factory'
import { makeAddCompanyValidation } from '../../validations/company/add-company-validation-factory'

export const makeAddCompanyController = (): IController => {
  const addCompanyController = new AddCompanyController(makeAddCompanyValidation(), makeAddCompany())
  return makeLogControllerDecorator(addCompanyController)
}
