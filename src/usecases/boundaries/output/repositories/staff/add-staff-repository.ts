import { StaffModel } from '@/src/entities/staff'

export type AddStaffRepositoryParams = {
  name: string
  email: string
  password: string
}

export interface IAddStaffRepository {
  add (params: AddStaffRepositoryParams): Promise<StaffModel>
}
