import { UnauthorizedError } from '@/src/application/errors'
import { Role, UserModel } from '@/src/entities/user'
import { Either } from '@/src/shared/either'

export type CheckUserTokenAndAuthorizationParams = {
  accessToken: string
  roles: Role[]
}

export type CheckUserTokenAndAuthorizationReturn = Either<UnauthorizedError, UserModel>

export interface ICheckUserTokenAndAuthorization {
  check: (params: CheckUserTokenAndAuthorizationParams) => Promise<CheckUserTokenAndAuthorizationReturn>
}
