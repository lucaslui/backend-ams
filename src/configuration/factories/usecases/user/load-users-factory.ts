import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'
import { ILoadUsers } from '@/src/usecases/boundaries/input/user/load-users'
import { LoadUsers } from '@/src/usecases/interactors/user/load-users'

export const makeLoadUsers = (): ILoadUsers => {
  const userMongoRepository = new UserMongoRepository()
  return new LoadUsers(userMongoRepository)
}
