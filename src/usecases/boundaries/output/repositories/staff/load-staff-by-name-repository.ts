import { StaffModel } from '@/src/entities/staff'

export type LoadStaffByNameParams = {
  name: string
}

export interface ILoadStaffByNameRepository {
  loadByName (params: LoadStaffByNameParams): Promise<StaffModel>
}
