import { UnauthorizedError } from '@/src/application/errors'
import { left, right } from '@/src/shared/either'
import { CheckStaffAuthenticationParams, CheckStaffAuthenticationReturn, ICheckStaffAuthentication } from '../../boundaries/input/auth/check-staff-authentication'
import { IEncrypter } from '../../boundaries/output/criptography/encrypter'
import { IHashComparer } from '../../boundaries/output/criptography/hash-comparer'
import { ILoadStaffByEmailRepository } from '../../boundaries/output/repositories/staff/load-staff-by-email-repository'
import { IUpdateAccessTokenRepository } from '../../boundaries/output/repositories/staff/update-access-token-repository'

export class CheckStaffAuthentication implements ICheckStaffAuthentication {
  constructor (
    private readonly staffsRepository: ILoadStaffByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {}

  async auth (params: CheckStaffAuthenticationParams): Promise<CheckStaffAuthenticationReturn> {
    const staff = await this.staffsRepository.loadByEmail(params.email)

    if (!staff) {
      return left(new UnauthorizedError())
    }

    const isAuthorized = await this.hashComparer.compare(params.password, staff.password)

    if (!isAuthorized) {
      return left(new UnauthorizedError())
    }

    const accessToken = await this.encrypter.encrypt(staff.id)

    await this.updateAccessTokenRepository.updateAccessToken(staff.id, accessToken)

    return right(accessToken)
  }
}
