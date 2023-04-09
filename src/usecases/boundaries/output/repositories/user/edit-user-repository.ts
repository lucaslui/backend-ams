import { UserModel } from '@/src/entities/user'

export type EditUserRepositoryParams = {
  companyId: string
  userId: string
  name: string
  email: string
  role: string
}

export interface IEditUserRepository {
  edit (params: EditUserRepositoryParams): Promise<UserModel>
}
