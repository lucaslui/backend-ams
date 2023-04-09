import { EmailInUseError } from '@/src/application/errors'
import { left, right } from '@/src/shared/either'
import { IAddStaff, AddStaffParams, AddStaffReturn } from '../../boundaries/input/staff/add-staff'
import { IHasher } from '../../boundaries/output/criptography/hasher'
import { IAddStaffRepository } from '../../boundaries/output/repositories/staff/add-staff-repository'
import { ILoadStaffByEmailRepository } from '../../boundaries/output/repositories/staff/load-staff-by-email-repository'

export class AddStaff implements IAddStaff {
  constructor (
    private readonly staffRepository: ILoadStaffByEmailRepository & IAddStaffRepository,
    private readonly hasher: IHasher
  ) {}

  async add (params: AddStaffParams): Promise<AddStaffReturn> {
    const isEmailInUse = await this.staffRepository.loadByEmail(params.email)

    if (isEmailInUse) {
      return left(new EmailInUseError())
    }

    const randomPasswordGenerated = 'lucas1234'

    const hashedPassword = await this.hasher.hash(randomPasswordGenerated)

    const staff = await this.staffRepository.add({ ...params, password: hashedPassword })

    return right(staff)
  }
}
