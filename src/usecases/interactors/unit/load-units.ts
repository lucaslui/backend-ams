import { PaginateDataModel } from '@/src/entities/data'
import { UnitModel } from '@/src/entities/unit'
import { ILoadUnits, LoadUnitsParams } from '../../boundaries/input/unit/load-units'
import { ILoadUnitsRepository } from '../../boundaries/output/repositories/unit/load-units-repository'

export class LoadUnits implements ILoadUnits {
  constructor (
    private readonly unitsRepository: ILoadUnitsRepository
  ) {}

  async load (params: LoadUnitsParams): Promise<PaginateDataModel<UnitModel[]>> {
    const units = await this.unitsRepository.load(params)
    return units
  }
}
