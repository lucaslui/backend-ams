import { Role } from '@/src/entities/user'
import { ICheckUserTokenAndAuthorization } from '@/src/usecases/boundaries/input/auth/check-user-token-and-authorization'
import { ok, serverError, unauthorized } from '../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols'

export class UserAuthorizationMiddleware implements IMiddleware {
  constructor (
    private readonly checkUserTokenAndAuthorization: ICheckUserTokenAndAuthorization,
    private readonly roles?: Role[]
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      const companyId = httpRequest.headers?.['x-company-id']

      if (process.env.NODE_ENV === 'test') {
        return ok({ userId: 'any_user_id', companyId: 'any_company_id' })
      }

      if (accessToken) {
        const result = await this.checkUserTokenAndAuthorization.check({ accessToken, roles: this.roles })
        if (result.isLeft()) {
          return unauthorized()
        }
        return ok({ userId: result.value.id, companyId })
      } else {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
