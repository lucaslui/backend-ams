import { PaginateDataModel } from '@/src/entities/data'
import { AssetModel } from '@/src/entities/asset'

export type LoadAssetsByUnitIdParams = {
  companyId: string
  unitId: string
  filter: string
  page: number
}

export interface ILoadAssetsByUnitId {
  load (params: LoadAssetsByUnitIdParams): Promise<PaginateDataModel<AssetModel[]>>
}
