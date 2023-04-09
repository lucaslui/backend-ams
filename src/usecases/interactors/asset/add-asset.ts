import { left, right } from '@/src/shared/either'
import { IAddAsset, AddAssetParams, AddAssetReturn } from '../../boundaries/input/asset/add-asset'
import { IAddAssetRepository } from '../../boundaries/output/repositories/asset/add-asset-repository'
import { ILoadAssetByNameRepository } from '../../boundaries/output/repositories/asset/load-asset-by-name-repository'

export class AddAsset implements IAddAsset {
  constructor (
    private readonly assetsRepository: ILoadAssetByNameRepository & IAddAssetRepository
  ) {}

  async add (params: AddAssetParams): Promise<AddAssetReturn> {
    const isNameAlreadyUsed = await this.assetsRepository.loadByName({ companyId: params.companyId, name: params.name })

    if (isNameAlreadyUsed) {
      return left(new Error('Asset name already in use'))
    }

    const asset = await this.assetsRepository.add({
      companyId: params.companyId,
      unitId: params.unitId,
      name: params.name,
      description: params.description,
      model: params.model,
      owner: params.owner,
      status: params.status,
      health: params.health
    })

    return right(asset)
  }
}
