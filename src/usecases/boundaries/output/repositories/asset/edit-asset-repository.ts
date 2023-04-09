import { AssetModel } from '@/src/entities/asset'

export type EditAssetRepositoryParams = {
  companyId: string
  assetId: string
  name: string
  description: string
  model: string
  owner: string
  status: string
  health: number
}

export interface IEditAssetRepository {
  edit (params: EditAssetRepositoryParams): Promise<AssetModel>
}
