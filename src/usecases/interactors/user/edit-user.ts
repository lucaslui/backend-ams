import { left, right } from '@/src/shared/either'
import { IEditUser, EditUserParams, EditUserReturn } from '../../boundaries/input/user/edit-user'
import { ILoadUserByIdRepository } from '../../boundaries/output/repositories/user/load-user-by-id-repository'
import { IEditUserRepository } from '../../boundaries/output/repositories/user/edit-user-repository'
import { ILoadUserByNameRepository } from '../../boundaries/output/repositories/user/load-user-by-name-repository'

export class EditUser implements IEditUser {
  constructor (
    private readonly usersRepository: ILoadUserByNameRepository & ILoadUserByIdRepository & IEditUserRepository
  ) {}

  async edit (params: EditUserParams): Promise<EditUserReturn> {
    const assetByName = await this.usersRepository.loadByName({ companyId: params.companyId, name: params.name })
    if (assetByName) {
      if (assetByName?.id !== params.userId) {
        return left(new Error('User name already in use'))
      }
    }
    const assetById = await this.usersRepository.loadById({ companyId: params.companyId, userId: params.userId })
    if (!assetById) {
      return left(new Error('User not found'))
    }
    const newUser = await this.usersRepository.edit(params)
    return right(newUser)
  }
}
