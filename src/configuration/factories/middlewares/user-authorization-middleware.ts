import { Role } from '@/src/entities/user'
import { UserAuthorizationMiddleware } from '../../../application/middlewares/user-authorization-middleware'
import { IMiddleware } from '../../../application/protocols'
import { makeCheckUserTokenAndAuthorization } from '../usecases/auth/check-user-token-and-authorization'

export const makeUserAuthorizationMiddleware = (roles: Role[]): IMiddleware => {
  const checkUserTokenAndAuthorization = makeCheckUserTokenAndAuthorization()
  return new UserAuthorizationMiddleware(checkUserTokenAndAuthorization, roles)
}
