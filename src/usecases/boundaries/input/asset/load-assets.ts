import { PaginateDataModel } from '@/src/entities/data'
import { AssetModel } from '@/src/entities/asset'

export type LoadAssetsParams = {
  companyId: string
  filter: string
  page: number
}

export interface ILoadAssets {
  load (params: LoadAssetsParams): Promise<PaginateDataModel<AssetModel[]>>
}
