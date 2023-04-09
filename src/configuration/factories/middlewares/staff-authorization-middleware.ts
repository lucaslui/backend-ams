import { StaffAuthorizationMiddleware } from '@/src/application/middlewares/staff-authorization-middleware'
import { IMiddleware } from '../../../application/protocols'
import { makeCheckStaffToken } from '../usecases/auth/check-staff-token'

export const makeStaffAuthorizationMiddleware = (): IMiddleware => {
  const checkStaffTokenAndAuthorization = makeCheckStaffToken()
  return new StaffAuthorizationMiddleware(checkStaffTokenAndAuthorization)
}
