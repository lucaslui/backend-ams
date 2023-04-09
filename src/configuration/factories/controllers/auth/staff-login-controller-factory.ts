
import { StaffLoginController } from '@/src/application/controllers/auth/staff-login-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeCheckStaffAuthentication } from '../../usecases/auth/check-staff-authentication'
import { makeLoginValidation } from '../../validations/auth/login-validation-factory'

export const makeStaffLoginController = (): IController => {
  const staffLoginController = new StaffLoginController(makeCheckStaffAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(staffLoginController)
}
