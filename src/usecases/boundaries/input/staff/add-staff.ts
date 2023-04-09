import { EmailInUseError } from '@/src/application/errors'
import { StaffModel } from '@/src/entities/staff'
import { Either } from '@/src/shared/either'

export type AddStaffParams = {
  name: string
  email: string
}

export type AddStaffReturn = Either<EmailInUseError, StaffModel>

export interface IAddStaff {
  add: (params: AddStaffParams) => Promise<AddStaffReturn>
}
