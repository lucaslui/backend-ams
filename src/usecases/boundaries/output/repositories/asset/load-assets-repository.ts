import { PaginateDataModel } from '@/src/entities/data'
import { AssetModel } from '@/src/entities/asset'
import { LoadAssetsParams } from '../../../input/asset/load-assets'

export interface ILoadAssetsRepository {
  load (params: LoadAssetsParams): Promise<PaginateDataModel<AssetModel[]>>
}
