import { BcryptAdapter } from '@/src/infrastructure/criptography/bcrypt-adapter'
import { JwtAdapter } from '@/src/infrastructure/criptography/jwt-adapter'
import { StaffMongoRepository } from '@/src/infrastructure/repositories/mongodb/staff-mongo-repository'
import { ICheckStaffAuthentication } from '@/src/usecases/boundaries/input/auth/check-staff-authentication'
import { CheckStaffAuthentication } from '@/src/usecases/interactors/auth/check-staff-authentication'

import env from '@/src/configuration/env'

export const makeCheckStaffAuthentication = (): ICheckStaffAuthentication => {
  const userMongoRepository = new StaffMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new CheckStaffAuthentication(userMongoRepository, bcryptAdapter, jwtAdapter, userMongoRepository)
}
