import { StaffModel } from '@/src/entities/staff'
import { Either } from '@/src/shared/either'

export type EditStaffParams = {
  staffId: string
  name: string
  email: string
}

export type EditStaffReturn = Either<Error, StaffModel>

export interface IEditStaff {
  edit (params: EditStaffParams): Promise<EditStaffReturn>
}
