import { AssetMongoRepository } from '@/src/infrastructure/repositories/mongodb/asset-mongo-repository'
import { ILoadAssets } from '@/src/usecases/boundaries/input/asset/load-assets'
import { LoadAssets } from '@/src/usecases/interactors/asset/load-assets'

export const makeLoadAssets = (): ILoadAssets => {
  const assetMongoRepository = new AssetMongoRepository()
  return new LoadAssets(assetMongoRepository)
}
