import { UnitsMongoRepository } from '@/src/infrastructure/repositories/mongodb/unit-mongo-repository'
import { IDeleteUnit } from '@/src/usecases/boundaries/input/unit/delete-unit'
import { DeleteUnit } from '@/src/usecases/interactors/unit/delete-unit'

export const makeDeleteUnit = (): IDeleteUnit => {
  const unitMongoRepository = new UnitsMongoRepository()
  return new DeleteUnit(unitMongoRepository)
}
