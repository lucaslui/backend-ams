import { Either } from '@/src/shared/either'

export type DeleteUserParams = {
  companyId: string
  userId: string
}

export type DeleteUserReturn = Either<Error, void>

export interface IDeleteUser {
  delete (params: DeleteUserParams): Promise<DeleteUserReturn>
}
