import { PaginateDataModel } from '@/src/entities/data'
import { StaffModel } from '@/src/entities/staff'
import { ILoadStaffs, LoadStaffsParams } from '../../boundaries/input/staff/load-staffs'
import { ILoadStaffsRepository } from '../../boundaries/output/repositories/staff/load-staffs-repository'

export class LoadStaffs implements ILoadStaffs {
  constructor (
    private readonly usersRepository: ILoadStaffsRepository
  ) {}

  async load (params: LoadStaffsParams): Promise<PaginateDataModel<StaffModel[]>> {
    const users = await this.usersRepository.load(params)
    return users
  }
}
