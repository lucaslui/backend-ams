import { left, right } from '@/src/shared/either'
import { IEditAsset, EditAssetParams, EditAssetReturn } from '../../boundaries/input/asset/edit-asset'
import { IEditAssetRepository } from '../../boundaries/output/repositories/asset/edit-asset-repository'
import { ILoadAssetByNameRepository } from '../../boundaries/output/repositories/asset/load-asset-by-name-repository'
import { IEditAssetImageRepository } from '../../boundaries/output/repositories/asset/edit-asset-image-repository'
import { ILoadAssetByIdRepository } from '../../boundaries/output/repositories/asset/load-asset-by-id-repository'

export class EditAsset implements IEditAsset {
  constructor (
    private readonly assetsRepository: ILoadAssetByNameRepository & ILoadAssetByIdRepository & IEditAssetRepository & IEditAssetImageRepository
  ) {}

  async edit (params: EditAssetParams): Promise<EditAssetReturn> {
    const assetByName = await this.assetsRepository.loadByName({ companyId: params.companyId, name: params.name })

    if (assetByName) {
      if (assetByName?.id !== params.assetId) {
        return left(new Error('Asset name already in use'))
      }
    }

    const assetById = await this.assetsRepository.loadById({ assetId: params.assetId })

    if (!assetById) {
      return left(new Error('Asset not found'))
    }

    const newAsset = await this.assetsRepository.edit({
      companyId: params.companyId,
      assetId: params.assetId,
      name: params.name,
      description: params.description,
      model: params.model,
      owner: params.owner,
      status: params.status,
      health: params.health
    })

    return right(newAsset)
  }
}
