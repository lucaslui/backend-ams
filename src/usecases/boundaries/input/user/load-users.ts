import { PaginateDataModel } from '@/src/entities/data'
import { UserModel } from '@/src/entities/user'

export type LoadUsersParams = {
  companyId: string
  filter: string
  page: number
}

export interface ILoadUsers {
  load (params: LoadUsersParams): Promise<PaginateDataModel<UserModel[]>>
}
