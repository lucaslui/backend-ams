import { UnitsMongoRepository } from '@/src/infrastructure/repositories/mongodb/unit-mongo-repository'
import { ILoadUnits } from '@/src/usecases/boundaries/input/unit/load-units'
import { LoadUnits } from '@/src/usecases/interactors/unit/load-units'

export const makeLoadUnits = (): ILoadUnits => {
  const unitMongoRepository = new UnitsMongoRepository()
  return new LoadUnits(unitMongoRepository)
}
