import { AssetMongoRepository } from '@/src/infrastructure/repositories/mongodb/asset-mongo-repository'
import { ILoadAssetsByUnitId } from '@/src/usecases/boundaries/input/asset/load-assets-by-unit-id'
import { LoadAssetsByUnitId } from '@/src/usecases/interactors/asset/load-assets-by-unit-id'

export const makeLoadAssetsByUnitId = (): ILoadAssetsByUnitId => {
  const assetMongoRepository = new AssetMongoRepository()
  return new LoadAssetsByUnitId(assetMongoRepository)
}
