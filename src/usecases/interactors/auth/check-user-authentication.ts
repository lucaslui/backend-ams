import { UnauthorizedError } from '@/src/application/errors'
import { left, right } from '@/src/shared/either'
import { ICheckUserAuthentication, CheckUserAuthenticationParams, CheckUserAuthenticationReturn } from '../../boundaries/input/auth/check-user-authentication'
import { IEncrypter } from '../../boundaries/output/criptography/encrypter'
import { IHashComparer } from '../../boundaries/output/criptography/hash-comparer'
import { ILoadUserByEmailRepository } from '../../boundaries/output/repositories/user/load-user-by-email-repository'
import { IUpdateAccessTokenRepository } from '../../boundaries/output/repositories/user/update-access-token-repository'

export class CheckUserAuthentication implements ICheckUserAuthentication {
  constructor (
    private readonly usersRepository: ILoadUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {}

  async auth (params: CheckUserAuthenticationParams): Promise<CheckUserAuthenticationReturn> {
    const user = await this.usersRepository.loadByEmail(params.email)

    if (!user) {
      return left(new UnauthorizedError())
    }

    const isAuthorized = await this.hashComparer.compare(params.password, user.password)

    if (!isAuthorized) {
      return left(new UnauthorizedError())
    }

    const accessToken = await this.encrypter.encrypt(user.id)

    await this.updateAccessTokenRepository.updateAccessToken(user.id, accessToken)

    return right({
      accessToken,
      companyId: user.companyId
    })
  }
}
