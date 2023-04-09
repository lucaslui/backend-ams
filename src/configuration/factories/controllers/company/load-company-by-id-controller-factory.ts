import { LoadCompanyByIdController } from '@/src/application/controllers/company/load-company-by-id-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeLoadCompanyById } from '../../usecases/company/load-company-by-id-factory'

export const makeLoadCompanyByIdController = (): IController => {
  const loadCompanyByIdController = new LoadCompanyByIdController(makeLoadCompanyById())
  return makeLogControllerDecorator(loadCompanyByIdController)
}
