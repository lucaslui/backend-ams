import { UnitMongoRepository } from '@/src/infrastructure/repositories/mongodb/unit-mongo-repository'
import { IAddUnit } from '@/src/usecases/boundaries/input/unit/add-unit'
import { AddUnit } from '@/src/usecases/interactors/unit/add-unit'

export const makeAddUnit = (): IAddUnit => {
  const unitMongoRepository = new UnitMongoRepository()
  return new AddUnit(unitMongoRepository)
}
