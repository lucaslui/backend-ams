import { AssetModel } from '@/src/entities/asset'

export type IAddAssetRepositoryParams = {
  companyId: string
  unitId: string
  name: string
  description: string
  model: string
  owner: string
  status: string
  health: number
}

export interface IAddAssetRepository {
  add (params: IAddAssetRepositoryParams): Promise<AssetModel>
}
