import { UserMongoRepository } from '@/src/infrastructure/repositories/mongodb/user-mongo-repository'
import { CheckUserTokenAndAuthorization } from '@/src/usecases/interactors/auth/check-user-token-and-authorization'
import { JwtAdapter } from '@/src/infrastructure/criptography/jwt-adapter'

import env from '@/src/configuration/env'

export const makeCheckUserTokenAndAuthorization = (): CheckUserTokenAndAuthorization => {
  const userMongoRepository = new UserMongoRepository()
  const secret = env.jwtSecret
  const jwtAdapter = new JwtAdapter(secret)
  return new CheckUserTokenAndAuthorization(userMongoRepository, jwtAdapter)
}
