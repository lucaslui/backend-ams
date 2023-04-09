import { PaginateDataModel } from '@/src/entities/data'
import { UnitModel } from '@/src/entities/unit'
import { LoadUnitsParams } from '../../../input/unit/load-units'

export interface ILoadUnitsRepository {
  load (params: LoadUnitsParams): Promise<PaginateDataModel<UnitModel[]>>
}
