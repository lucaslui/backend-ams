import { DeleteUserController } from '@/src/application/controllers/user/delete-user-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDeleteUser } from '../../usecases/user/delete-user-factory'

export const makeDeleteUserController = (): IController => {
  const deleteUserController = new DeleteUserController(makeDeleteUser())
  return makeLogControllerDecorator(deleteUserController)
}
