import { AssetMongoRepository } from '@/src/infrastructure/repositories/mongodb/asset-mongo-repository'
import { IEditAsset } from '@/src/usecases/boundaries/input/asset/edit-asset'
import { EditAsset } from '@/src/usecases/interactors/asset/edit-asset'

export const makeEditAsset = (): IEditAsset => {
  const assetMongoRepository = new AssetMongoRepository()
  return new EditAsset(assetMongoRepository)
}
