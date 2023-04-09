import { AssetMongoRepository } from '@/src/infrastructure/repositories/mongodb/asset-mongo-repository'
import { IEditAssetImage } from '@/src/usecases/boundaries/input/asset/edit-asset-image'
import { EditAssetImage } from '@/src/usecases/interactors/asset/edit-asset-image'

export const makeEditAssetImage = (): IEditAssetImage => {
  const assetMongoRepository = new AssetMongoRepository()
  return new EditAssetImage(assetMongoRepository)
}
