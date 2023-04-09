import { UnauthorizedError } from '@/src/application/errors'
import { Either } from '@/src/shared/either'

export type CheckStaffAuthenticationParams = {
  email: string
  password: string
}

export type CheckStaffAuthenticationReturn = Either<UnauthorizedError, string>

export interface ICheckStaffAuthentication {
  auth: (params: CheckStaffAuthenticationParams) => Promise<CheckStaffAuthenticationReturn>
}
