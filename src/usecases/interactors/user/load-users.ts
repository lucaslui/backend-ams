import { PaginateDataModel } from '@/src/entities/data'
import { ILoadUsers, LoadUsersParams } from '../../boundaries/input/user/load-users'
import { UserModel } from '@/src/entities/user'
import { ILoadUsersRepository } from '../../boundaries/output/repositories/user/load-users-repository'

export class LoadUsers implements ILoadUsers {
  constructor (
    private readonly usersRepository: ILoadUsersRepository
  ) {}

  async load (params: LoadUsersParams): Promise<PaginateDataModel<UserModel[]>> {
    const users = await this.usersRepository.load(params)
    return users
  }
}
