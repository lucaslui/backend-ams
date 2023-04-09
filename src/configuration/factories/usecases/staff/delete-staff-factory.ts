import { StaffMongoRepository } from '@/src/infrastructure/repositories/mongodb/staff-mongo-repository'
import { IDeleteStaff } from '@/src/usecases/boundaries/input/staff/delete-staff'
import { DeleteStaff } from '@/src/usecases/interactors/staff/delete-staff'

export const makeDeleteStaff = (): IDeleteStaff => {
  const userMongoRepository = new StaffMongoRepository()
  return new DeleteStaff(userMongoRepository)
}
