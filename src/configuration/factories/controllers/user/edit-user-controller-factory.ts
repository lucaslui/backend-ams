import { EditUserController } from '@/src/application/controllers/user/edit-user-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeEditUser } from '../../usecases/user/edit-user-factory'
import { makeEditUserValidation } from '../../validations/user/edit-user-validation-factory'

export const makeEditUserController = (): IController => {
  const editUserController = new EditUserController(makeEditUser(), makeEditUserValidation())
  return makeLogControllerDecorator(editUserController)
}
