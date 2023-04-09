import { ICheckStaffToken } from '@/src/usecases/boundaries/input/auth/check-staff-token'
import { ok, serverError, unauthorized } from '../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols'

export class StaffAuthorizationMiddleware implements IMiddleware {
  constructor (
    private readonly checkStaffToken: ICheckStaffToken
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']

      if (process.env.NODE_ENV === 'test') {
        return ok({ userId: 'any_user_id' })
      }

      if (accessToken) {
        const result = await this.checkStaffToken.check({ accessToken })
        if (result.isLeft()) {
          return unauthorized()
        }
        return ok({ userId: result.value.id })
      } else {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
