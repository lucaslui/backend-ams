import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddStaff } from '../../usecases/staff/add-staff-factory'
import { makeAddStaffValidation } from '../../validations/staff/add-staff-validation-factory'
import { AddStaffController } from '@/src/application/controllers/staff/add-staff-controller'

export const makeAddStaffController = (): IController => {
  const addStaffController = new AddStaffController(makeAddStaff(), makeAddStaffValidation())
  return makeLogControllerDecorator(addStaffController)
}
