import { AssetMongoRepository } from '@/src/infrastructure/repositories/mongodb/asset-mongo-repository'
import { IDeleteAsset } from '@/src/usecases/boundaries/input/asset/delete-asset'
import { DeleteAsset } from '@/src/usecases/interactors/asset/delete-asset'

export const makeDeleteAsset = (): IDeleteAsset => {
  const assetMongoRepository = new AssetMongoRepository()
  return new DeleteAsset(assetMongoRepository)
}
