import env from '@/src/configuration/env'

import { JwtAdapter } from '@/src/infrastructure/criptography/jwt-adapter'
import { StaffMongoRepository } from '@/src/infrastructure/repositories/mongodb/staff-mongo-repository'
import { CheckStaffToken } from '@/src/usecases/interactors/auth/check-staff-token'

export const makeCheckStaffToken = (): CheckStaffToken => {
  const userMongoRepository = new StaffMongoRepository()
  const secret = env.jwtSecret
  const jwtAdapter = new JwtAdapter(secret)
  return new CheckStaffToken(userMongoRepository, jwtAdapter)
}
