import { EditUnitController } from '@/src/application/controllers/unit/edit-unit-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeEditUnit } from '../../usecases/unit/edit-unit-factory'
import { makeEditUnitValidation } from '../../validations/unit/edit-unit-validation-factory'

export const makeEditUnitController = (): IController => {
  const editUnitController = new EditUnitController(makeEditUnit(), makeEditUnitValidation())
  return makeLogControllerDecorator(editUnitController)
}
