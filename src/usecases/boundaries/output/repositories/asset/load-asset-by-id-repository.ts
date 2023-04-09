import { AssetModel } from '@/src/entities/asset'

export type LoadAssetByIdParams = {
  assetId: string
}

export interface ILoadAssetByIdRepository {
  loadById (params: LoadAssetByIdParams): Promise<AssetModel>
}
