import { DeleteStaffController } from '@/src/application/controllers/staff/delete-staff-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDeleteStaff } from '../../usecases/staff/delete-staff-factory'

export const makeDeleteStaffController = (): IController => {
  const deleteStaffController = new DeleteStaffController(makeDeleteStaff())
  return makeLogControllerDecorator(deleteStaffController)
}
