import { UnitModel } from '@/src/entities/unit'

export type LoadUnitByIdParams = {
  unitId: string
}

export interface ILoadUnitByIdRepository {
  loadById (params: LoadUnitByIdParams): Promise<UnitModel>
}
