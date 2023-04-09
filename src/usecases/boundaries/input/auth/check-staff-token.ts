import { UnauthorizedError } from '@/src/application/errors'
import { StaffModel } from '@/src/entities/staff'
import { Either } from '@/src/shared/either'

export type CheckStaffTokenParams = {
  accessToken: string
}

export type CheckStaffTokenReturn = Either<UnauthorizedError, StaffModel>

export interface ICheckStaffToken {
  check: (params: CheckStaffTokenParams) => Promise<CheckStaffTokenReturn>
}
