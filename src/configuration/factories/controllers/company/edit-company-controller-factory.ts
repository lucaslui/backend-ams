import { EditCompanyController } from '@/src/application/controllers/company/edit-company-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeEditCompany } from '../../usecases/company/edit-company-factory'
import { makeEditCompanyValidation } from '../../validations/company/edit-company-validation-factory'

export const makeEditCompanyController = (): IController => {
  const editCompanyRegionController = new EditCompanyController(makeEditCompanyValidation(),makeEditCompany())
  return makeLogControllerDecorator(editCompanyRegionController)
}
