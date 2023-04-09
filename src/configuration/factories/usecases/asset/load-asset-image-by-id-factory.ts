import { AssetMongoRepository } from '@/src/infrastructure/repositories/mongodb/asset-mongo-repository'
import { ILoadAssetImageById } from '@/src/usecases/boundaries/input/asset/load-asset-image-by-id'
import { LoadAssetImageById } from '@/src/usecases/interactors/asset/load-asset-image-by-id'

export const makeLoadAssetImageById = (): ILoadAssetImageById => {
  const assetMongoRepository = new AssetMongoRepository()
  return new LoadAssetImageById(assetMongoRepository)
}
