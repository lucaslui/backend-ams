import { BcryptAdapter } from '@/src/infrastructure/criptography/bcrypt-adapter'
import { StaffMongoRepository } from '@/src/infrastructure/repositories/mongodb/staff-mongo-repository'
import { IAddStaff } from '@/src/usecases/boundaries/input/staff/add-staff'
import { AddStaff } from '@/src/usecases/interactors/staff/add-staff'

export const makeAddStaff = (): IAddStaff => {
  const staffMongoRepository = new StaffMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  return new AddStaff(staffMongoRepository, bcryptAdapter)
}
