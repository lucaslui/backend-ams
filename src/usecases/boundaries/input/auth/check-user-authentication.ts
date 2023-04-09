import { UnauthorizedError } from '@/src/application/errors'
import { UserAccountModel } from '@/src/entities/user'
import { Either } from '@/src/shared/either'

export type CheckUserAuthenticationParams = {
  email: string
  password: string
}

export type CheckUserAuthenticationReturn = Either<UnauthorizedError, UserAccountModel>

export interface ICheckUserAuthentication {
  auth: (params: CheckUserAuthenticationParams) => Promise<CheckUserAuthenticationReturn>
}
