import { DeleteUnitController } from '@/src/application/controllers/unit/delete-unit-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDeleteUnit } from '../../usecases/unit/delete-unit-factory'

export const makeDeleteUnitController = (): IController => {
  const deleteUnitController = new DeleteUnitController(makeDeleteUnit())
  return makeLogControllerDecorator(deleteUnitController)
}
