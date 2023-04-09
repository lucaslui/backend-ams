import { UnitModel } from '@/src/entities/unit'

export interface ILoadUnitsByIdListRepository {
  loadByIdList (categoryIdList: string[]): Promise<UnitModel[]>
}
