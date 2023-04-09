import { StaffModel } from '@/src/entities/staff'

export type EditStaffRepositoryParams = {
  staffId: string
  name: string
  email: string
}

export interface IEditStaffRepository {
  edit (params: EditStaffRepositoryParams): Promise<StaffModel>
}
