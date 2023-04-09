import { AssetImageModel } from '@/src/entities/asset'

export type LoadAssetImageByIdParams = {
  companyId: string
  imageId: string
}

export interface ILoadAssetImageById {
  load (params: LoadAssetImageByIdParams): Promise<AssetImageModel>
}
