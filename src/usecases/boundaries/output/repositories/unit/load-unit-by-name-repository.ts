import { UnitModel } from '@/src/entities/unit'

export type LoadUnitByNameParams = {
  companyId: string
  name: string
}

export interface ILoadUnitByNameRepository {
  loadByName (params: LoadUnitByNameParams): Promise<UnitModel>
}
