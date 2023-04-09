import { PaginateDataModel } from '@/src/entities/data'
import { LoadUsersParams } from '../../../input/user/load-users'
import { UserModel } from '@/src/entities/user'

export interface ILoadUsersRepository {
  load (params: LoadUsersParams): Promise<PaginateDataModel<UserModel[]>>
}
