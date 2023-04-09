import { PaginateDataModel } from '@/src/entities/data'
import { UnitModel } from '@/src/entities/unit'

export type LoadUnitsParams = {
  companyId: string
  filter: string
  page: number
}

export interface ILoadUnits {
  load (params: LoadUnitsParams): Promise<PaginateDataModel<UnitModel[]>>
}
