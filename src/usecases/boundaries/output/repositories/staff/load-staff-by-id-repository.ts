import { StaffModel } from '@/src/entities/staff'

export type LoadStaffByIdParams = {
  staffId: string
}

export interface ILoadStaffByIdRepository {
  loadById: (params: LoadStaffByIdParams) => Promise<StaffModel>
}
