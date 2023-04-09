import { UserModel } from '@/src/entities/user'

export type LoadUserByIdRepositortyParams = {
  companyId: string
  userId: string
}

export interface ILoadUserByIdRepository {
  loadById: (params: LoadUserByIdRepositortyParams) => Promise<UserModel>
}
