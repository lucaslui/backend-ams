import { EmailInUseError } from '@/src/application/errors'
import { EmailInvalidError } from '@/src/application/errors/mail-service-error'
import { UserModel } from '@/src/entities/user'
import { Either } from '@/src/shared/either'

export type AddUserParams = {
  name: string
  email: string
  role: string
  companyId: string
}

export type AddUserReturn = Either<EmailInUseError | EmailInvalidError, UserModel>

export interface IAddUser {
  add: (params: AddUserParams) => Promise<AddUserReturn>
}
