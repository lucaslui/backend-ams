import { StaffModel } from '@/src/entities/staff'

export interface ILoadStaffByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<StaffModel>
}
