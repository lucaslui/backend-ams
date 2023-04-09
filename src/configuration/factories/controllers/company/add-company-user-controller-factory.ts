import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { AddCompanyUserController } from '@/src/application/controllers/company/add-company-user-controller'
import { makeAddCompanyUser } from '../../usecases/company/add-company-user-factory'
import { makeAddCompanyUserValidation } from '../../validations/company/add-company-user-validation-factory'

export const makeAddCompanyUserController = (): IController => {
  const addCompanyController = new AddCompanyUserController(makeAddCompanyUser(), makeAddCompanyUserValidation())
  return makeLogControllerDecorator(addCompanyController)
}
