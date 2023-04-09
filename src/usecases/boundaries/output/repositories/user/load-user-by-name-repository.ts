import { UserModel } from '@/src/entities/user'

export type LoadUserByNameRepositoryParams = {
  companyId: string
  name: string
}

export interface ILoadUserByNameRepository {
  loadByName (params: LoadUserByNameRepositoryParams): Promise<UserModel>
}
