import { left, right } from '@/src/shared/either'
import { DeleteStaffParams, DeleteStaffReturn, IDeleteStaff } from '../../boundaries/input/staff/delete-staff'
import { IDeleteStaffRepository } from '../../boundaries/output/repositories/staff/delete-staff-repository'
import { ILoadStaffByIdRepository } from '../../boundaries/output/repositories/staff/load-staff-by-id-repository'

export class DeleteStaff implements IDeleteStaff {
  constructor (
    private readonly staffsRepository: ILoadStaffByIdRepository & IDeleteStaffRepository
  ) {}

  async delete (params: DeleteStaffParams): Promise<DeleteStaffReturn> {
    const isFoundStaff = await this.staffsRepository.loadById({ staffId: params.staffId })

    if (!isFoundStaff) {
      return left(new Error('Staff not found'))
    }

    await this.staffsRepository.delete(params)

    return right(undefined)
  }
}
