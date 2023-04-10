import { AssetMongoRepository } from '@/src/infrastructure/repositories/mongodb/asset-mongo-repository'
import { UnitMongoRepository } from '@/src/infrastructure/repositories/mongodb/unit-mongo-repository'
import { IDeleteUnit } from '@/src/usecases/boundaries/input/unit/delete-unit'
import { DeleteUnit } from '@/src/usecases/interactors/unit/delete-unit'

export const makeDeleteUnit = (): IDeleteUnit => {
  const unitMongoRepository = new UnitMongoRepository()
  const assetMongoRepository = new AssetMongoRepository()
  return new DeleteUnit(unitMongoRepository, assetMongoRepository)
}
