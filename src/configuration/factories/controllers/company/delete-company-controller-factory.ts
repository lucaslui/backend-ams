import { DeleteCompanyController } from '@/src/application/controllers/company/delete-company-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDeleteCompany } from '../../usecases/company/delete-company-factory'

export const makeDeleteCompanyController = (): IController => {
  const deleteCompanyController = new DeleteCompanyController(makeDeleteCompany())
  return makeLogControllerDecorator(deleteCompanyController)
}
