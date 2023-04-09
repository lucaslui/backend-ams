import { left, right } from '@/src/shared/either'
import { IEditStaff, EditStaffParams, EditStaffReturn } from '../../boundaries/input/staff/edit-staff'
import { IEditStaffRepository } from '../../boundaries/output/repositories/staff/edit-staff-repository'
import { ILoadStaffByIdRepository } from '../../boundaries/output/repositories/staff/load-staff-by-id-repository'
import { ILoadStaffByNameRepository } from '../../boundaries/output/repositories/staff/load-staff-by-name-repository'

export class EditStaff implements IEditStaff {
  constructor (
    private readonly staffsRepository: ILoadStaffByNameRepository & ILoadStaffByIdRepository & IEditStaffRepository
  ) {}

  async edit (params: EditStaffParams): Promise<EditStaffReturn> {
    const asset = await this.staffsRepository.loadByName({ name: params.name })

    if (asset) {
      if (asset.id !== params.staffId) {
        return left(new Error('Staff name already in use'))
      }
    }

    const assetById = await this.staffsRepository.loadById({ staffId: params.staffId })

    if (!assetById) {
      return left(new Error('Staff not found'))
    }

    const user = await this.staffsRepository.edit(params)

    return right(user)
  }
}
