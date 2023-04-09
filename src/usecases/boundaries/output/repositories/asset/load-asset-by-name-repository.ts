import { AssetModel } from '@/src/entities/asset'

export type LoadAssetByNameParams = {
  companyId: string
  name: string
}

export interface ILoadAssetByNameRepository {
  loadByName (params: LoadAssetByNameParams): Promise<AssetModel>
}
