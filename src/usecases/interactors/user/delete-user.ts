import { left, right } from '@/src/shared/either'
import { IDeleteUser, DeleteUserParams, DeleteUserReturn } from '../../boundaries/input/user/delete-user'
import { IDeleteUserRepository } from '../../boundaries/output/repositories/user/delete-user-repository'
import { ILoadUserByIdRepository } from '../../boundaries/output/repositories/user/load-user-by-id-repository'

export class DeleteUser implements IDeleteUser {
  constructor (
    private readonly usersRepository: ILoadUserByIdRepository & IDeleteUserRepository
  ) {}

  async delete (params: DeleteUserParams): Promise<DeleteUserReturn> {
    const isFoundUser = await this.usersRepository.loadById({ companyId: params.companyId, userId: params.userId })

    if (!isFoundUser) {
      return left(new Error('User not found'))
    }

    await this.usersRepository.delete(params)

    return right(undefined)
  }
}
