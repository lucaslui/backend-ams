import { PaginateDataModel } from '@/src/entities/data'
import { AssetModel } from '@/src/entities/asset'
import { ILoadAssets, LoadAssetsParams } from '../../boundaries/input/asset/load-assets'
import { ILoadAssetsRepository } from '../../boundaries/output/repositories/asset/load-assets-repository'

export class LoadAssets implements ILoadAssets {
  constructor (
    private readonly assetsRepository: ILoadAssetsRepository
  ) {}

  async load (params: LoadAssetsParams): Promise<PaginateDataModel<AssetModel[]>> {
    const assets = await this.assetsRepository.load(params)
    return assets
  }
}
