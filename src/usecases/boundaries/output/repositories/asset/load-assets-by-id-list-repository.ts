import { AssetModel } from '@/src/entities/asset'

export interface ILoadAssetsByIdListRepository {
  loadByIdList (categoryIdList: string[]): Promise<AssetModel[]>
}
