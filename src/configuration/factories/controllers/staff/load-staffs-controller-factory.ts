import { LoadStaffsController } from '@/src/application/controllers/staff/load-staffs-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeLoadStaffs } from '../../usecases/staff/load-staffs-factory'

export const makeLoadStaffsController = (): IController => {
  const loadStaffsController = new LoadStaffsController(makeLoadStaffs())
  return makeLogControllerDecorator(loadStaffsController)
}
