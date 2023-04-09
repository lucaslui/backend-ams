import { BcryptAdapter } from '@/src/infrastructure/criptography/bcrypt-adapter'
import { JwtAdapter } from '@/src/infrastructure/criptography/jwt-adapter'
import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'
import { CheckUserAuthentication } from '@/src/usecases/interactors/auth/check-user-authentication'
import { ICheckUserAuthentication } from '@/src/usecases/boundaries/input/auth/check-user-authentication'

import env from '@/src/configuration/env'

export const makeCheckUserAuthentication = (): ICheckUserAuthentication => {
  const userMongoRepository = new UserMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new CheckUserAuthentication(userMongoRepository, bcryptAdapter, jwtAdapter, userMongoRepository)
}
