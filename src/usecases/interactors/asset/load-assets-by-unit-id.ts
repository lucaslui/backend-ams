import { PaginateDataModel } from '@/src/entities/data'
import { AssetModel } from '@/src/entities/asset'
import { ILoadAssetsByUnitId, LoadAssetsByUnitIdParams } from '../../boundaries/input/asset/load-assets-by-unit-id'
import { ILoadAssetsByUnitIdRepository } from '../../boundaries/output/repositories/asset/load-asset-by-unit-id-repository'

export class LoadAssetsByUnitId implements ILoadAssetsByUnitId {
  constructor (
    private readonly assetsRepository: ILoadAssetsByUnitIdRepository
  ) {}

  async load (params: LoadAssetsByUnitIdParams): Promise<PaginateDataModel<AssetModel[]>> {
    const assets = await this.assetsRepository.loadByUnitId(params)
    return assets
  }
}
