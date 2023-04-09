import { LoadUsersController } from '@/src/application/controllers/user/load-users-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeLoadUsers } from '../../usecases/user/load-users-factory'

export const makeLoadUsersController = (): IController => {
  const loadUsersController = new LoadUsersController(makeLoadUsers())
  return makeLogControllerDecorator(loadUsersController)
}
