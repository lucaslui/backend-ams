import { EditStaffController } from '@/src/application/controllers/staff/edit-staff-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeEditStaff } from '../../usecases/staff/edit-staff-factory'
import { makeEditStaffValidation } from '../../validations/staff/edit-staff-validation-factory'

export const makeEditStaffController = (): IController => {
  const editStaffController = new EditStaffController(makeEditStaff(), makeEditStaffValidation())
  return makeLogControllerDecorator(editStaffController)
}
