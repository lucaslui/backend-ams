import { AssetModel } from '@/src/entities/asset'
import { PaginateDataModel } from '@/src/entities/data'

export type LoadAssetsByUnitIdParams = {
  companyId: string
  unitId: string
}

export interface ILoadAssetsByUnitIdRepository {
  loadByUnitId (params: LoadAssetsByUnitIdParams): Promise<PaginateDataModel<AssetModel[]>>
}
