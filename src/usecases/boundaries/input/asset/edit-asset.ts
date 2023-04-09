import { AssetModel } from '@/src/entities/asset'
import { Either } from '@/src/shared/either'

export type EditAssetParams = {
  companyId: string
  assetId: string
  name: string
  description: string
  model: string
  owner: string
  status: string
  health: number
}

export type EditAssetReturn = Either<Error, AssetModel>

export interface IEditAsset {
  edit (params: EditAssetParams): Promise<EditAssetReturn>
}
