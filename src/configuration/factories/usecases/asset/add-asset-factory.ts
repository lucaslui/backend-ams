import { AssetMongoRepository } from '@/src/infrastructure/repositories/mongodb/asset-mongo-repository'
import { IAddAsset } from '@/src/usecases/boundaries/input/asset/add-asset'
import { AddAsset } from '@/src/usecases/interactors/asset/add-asset'

export const makeAddAsset = (): IAddAsset => {
  const assetMongoRepository = new AssetMongoRepository()
  return new AddAsset(assetMongoRepository)
}
