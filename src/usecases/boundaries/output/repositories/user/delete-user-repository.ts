import { DeleteUserParams } from '../../../input/user/delete-user'

export interface IDeleteUserRepository {
  delete (params: DeleteUserParams): Promise<void>
}
