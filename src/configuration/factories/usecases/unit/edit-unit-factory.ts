import { UnitMongoRepository } from '@/src/infrastructure/repositories/mongodb/unit-mongo-repository'
import { IEditUnit } from '@/src/usecases/boundaries/input/unit/edit-unit'
import { EditUnit } from '@/src/usecases/interactors/unit/edit-unit'

export const makeEditUnit = (): IEditUnit => {
  const unitMongoRepository = new UnitMongoRepository()
  return new EditUnit(unitMongoRepository)
}
