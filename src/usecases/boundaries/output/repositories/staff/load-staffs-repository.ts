import { PaginateDataModel } from '@/src/entities/data'
import { StaffModel } from '@/src/entities/staff'
import { LoadStaffsParams } from '../../../input/staff/load-staffs'

export interface ILoadStaffsRepository {
  load (params: LoadStaffsParams): Promise<PaginateDataModel<StaffModel[]>>
}
