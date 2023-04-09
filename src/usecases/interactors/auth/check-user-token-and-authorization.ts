import { AccessDeniedError } from '@/src/application/errors/access-denied-error'
import { left, right } from '@/src/shared/either'
import { CheckUserTokenAndAuthorizationParams, CheckUserTokenAndAuthorizationReturn, ICheckUserTokenAndAuthorization } from '../../boundaries/input/auth/check-user-token-and-authorization'
import { IDecrypter } from '../../boundaries/output/criptography/decrypter'
import { ILoadUserByTokenRepository } from '../../boundaries/output/repositories/user/load-user-by-token-repository'

export class CheckUserTokenAndAuthorization implements ICheckUserTokenAndAuthorization {
  constructor (
    private readonly usersRepository: ILoadUserByTokenRepository,
    private readonly decrypter: IDecrypter
  ) {}

  async check (params: CheckUserTokenAndAuthorizationParams): Promise<CheckUserTokenAndAuthorizationReturn> {
    const decodedToken = await this.decrypter.decrypt(params.accessToken)

    if (!decodedToken) {
      return left(new AccessDeniedError())
    }

    const user = await this.usersRepository.loadByToken(params.accessToken)

    if (!user) {
      return left(new AccessDeniedError())
    }

    const isAuthorized = params.roles.includes(user.role)

    if (!isAuthorized) {
      return left(new AccessDeniedError())
    }

    return right(user)
  }
}
