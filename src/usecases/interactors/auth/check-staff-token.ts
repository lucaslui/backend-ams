import { AccessDeniedError } from '@/src/application/errors/access-denied-error'
import { left, right } from '@/src/shared/either'
import { ICheckStaffToken, CheckStaffTokenParams, CheckStaffTokenReturn } from '../../boundaries/input/auth/check-staff-token'
import { IDecrypter } from '../../boundaries/output/criptography/decrypter'
import { ILoadStaffByTokenRepository } from '../../boundaries/output/repositories/staff/load-staff-by-token-repository'

export class CheckStaffToken implements ICheckStaffToken {
  constructor (
    private readonly staffsRepository: ILoadStaffByTokenRepository,
    private readonly decrypter: IDecrypter
  ) {}

  async check (params: CheckStaffTokenParams): Promise<CheckStaffTokenReturn> {
    const decodedToken = await this.decrypter.decrypt(params.accessToken)

    if (!decodedToken) {
      return left(new AccessDeniedError())
    }

    const staff = await this.staffsRepository.loadByToken(params.accessToken)

    if (!staff) {
      return left(new AccessDeniedError())
    }

    return right(staff)
  }
}
