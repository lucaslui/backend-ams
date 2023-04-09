import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'
import { IEditUser } from '@/src/usecases/boundaries/input/user/edit-user'
import { EditUser } from '@/src/usecases/interactors/user/edit-user'

export const makeEditUser = (): IEditUser => {
  const userMongoRepository = new UserMongoRepository()
  return new EditUser(userMongoRepository)
}
