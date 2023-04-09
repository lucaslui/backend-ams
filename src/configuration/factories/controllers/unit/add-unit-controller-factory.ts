import { AddUnitController } from '@/src/application/controllers/unit/add-unit-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddUnit } from '../../usecases/unit/add-unit-factory'
import { makeAddUnitValidation } from '../../validations/unit/add-unit-validation-factory'

export const makeAddUnitController = (): IController => {
  const addUnitController = new AddUnitController(makeAddUnit(), makeAddUnitValidation())
  return makeLogControllerDecorator(addUnitController)
}
