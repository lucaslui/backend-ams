import { UserLoginController } from '@/src/application/controllers/auth/user-login-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeCheckUserAuthentication } from '../../usecases/auth/check-user-authentication'
import { makeLoginValidation } from '../../validations/auth/login-validation-factory'

export const makeUserLoginController = (): IController => {
  const userLoginController = new UserLoginController(makeCheckUserAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(userLoginController)
}
