import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'
import { IDeleteUser } from '@/src/usecases/boundaries/input/user/delete-user'
import { DeleteUser } from '@/src/usecases/interactors/user/delete-user'

export const makeDeleteUser = (): IDeleteUser => {
  const userMongoRepository = new UserMongoRepository()
  return new DeleteUser(userMongoRepository)
}
