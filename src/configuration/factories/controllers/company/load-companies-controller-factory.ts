import { LoadCompaniesController } from '@/src/application/controllers/company/load-companies-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeLoadCompanies } from '../../usecases/company/load-companies-factory'

export const makeLoadCompaniesController = (): IController => {
  const loadCompaniesController = new LoadCompaniesController(makeLoadCompanies())
  return makeLogControllerDecorator(loadCompaniesController)
}
