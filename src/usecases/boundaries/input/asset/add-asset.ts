import { AssetModel } from '@/src/entities/asset'
import { Either } from '@/src/shared/either'

export type AddAssetParams = {
  companyId: string
  unitId: string
  name: string
  description: string
  model: string
  owner: string
  status: string
  health: number
}

export type AddAssetReturn = Either<Error, AssetModel>

export interface IAddAsset {
  add (params: AddAssetParams): Promise<AddAssetReturn>
}
