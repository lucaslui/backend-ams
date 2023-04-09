import { LoadUnitsController } from '@/src/application/controllers/unit/load-units-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeLoadUnits } from '../../usecases/unit/load-units-factory'

export const makeLoadUnitsController = (): IController => {
  const loadUnitsController = new LoadUnitsController(makeLoadUnits())
  return makeLogControllerDecorator(loadUnitsController)
}
