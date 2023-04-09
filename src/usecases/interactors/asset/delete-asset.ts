import { left, right } from '@/src/shared/either'
import { IDeleteAsset, DeleteAssetParams, DeleteAssetReturn } from '../../boundaries/input/asset/delete-asset'
import { IDeleteAssetRepository } from '../../boundaries/output/repositories/asset/delete-asset-repository'
import { ILoadAssetByIdRepository } from '../../boundaries/output/repositories/asset/load-asset-by-id-repository'

export class DeleteAsset implements IDeleteAsset {
  constructor (
    private readonly assetsRepository: ILoadAssetByIdRepository & IDeleteAssetRepository
  ) {}

  async delete (params: DeleteAssetParams): Promise<DeleteAssetReturn> {
    const isFoundAsset = await this.assetsRepository.loadById({ assetId: params.assetId })

    if (!isFoundAsset) {
      return left(new Error('Asset not found'))
    }

    await this.assetsRepository.delete(params)

    return right(undefined)
  }
}
