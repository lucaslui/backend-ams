import { PaginateDataModel } from '@/src/entities/data'
import { StaffModel } from '@/src/entities/staff'

export type LoadStaffsParams = {
  companyId: string
  filter: string
  page: number
}

export interface ILoadStaffs {
  load (params: LoadStaffsParams): Promise<PaginateDataModel<StaffModel[]>>
}
