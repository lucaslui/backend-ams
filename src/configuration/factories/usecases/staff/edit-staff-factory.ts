import { StaffMongoRepository } from '@/src/infrastructure/repositories/mongodb/staff-mongo-repository'
import { IEditStaff } from '@/src/usecases/boundaries/input/staff/edit-staff'
import { EditStaff } from '@/src/usecases/interactors/staff/edit-staff'

export const makeEditStaff = (): IEditStaff => {
  const userMongoRepository = new StaffMongoRepository()
  return new EditStaff(userMongoRepository)
}
