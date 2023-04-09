import { UserModel } from '@/src/entities/user'

export type AddUserRepositoryParams = {
  name: string
  email: string
  role: string
  password: string
  companyId: string
}

export interface IAddUserRepository {
  add (params: AddUserRepositoryParams): Promise<UserModel>
}
