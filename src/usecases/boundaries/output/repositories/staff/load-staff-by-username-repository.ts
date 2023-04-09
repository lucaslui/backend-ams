import { StaffModel } from '@/src/entities/staff'

export interface ILoadStaffByEmailRepository {
  loadByEmail: (email: string) => Promise<StaffModel>
}
