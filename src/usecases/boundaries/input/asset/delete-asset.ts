import { Either } from '@/src/shared/either'

export type DeleteAssetParams = {
  companyId: string
  assetId: string
}

export type DeleteAssetReturn = Either<Error, void>

export interface IDeleteAsset {
  delete (params: DeleteAssetParams): Promise<DeleteAssetReturn>
}
