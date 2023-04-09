import { UserModel } from '@/src/entities/user'
import { Either } from '@/src/shared/either'

export type EditUserParams = {
  companyId: string
  userId: string
  name: string
  email: string
  role: string
}

export type EditUserReturn = Either<Error, UserModel>

export interface IEditUser {
  edit (params: EditUserParams): Promise<EditUserReturn>
}
