import { StaffMongoRepository } from '@/src/infrastructure/repositories/mongodb/staff-mongo-repository'
import { ILoadStaffs } from '@/src/usecases/boundaries/input/staff/load-staffs'
import { LoadStaffs } from '@/src/usecases/interactors/staff/load-staffs'

export const makeLoadStaffs = (): ILoadStaffs => {
  const userMongoRepository = new StaffMongoRepository()
  return new LoadStaffs(userMongoRepository)
}
