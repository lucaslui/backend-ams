import { AssetImageModel } from '@/src/entities/asset'

export type IEditAssetImageRepositoryParams = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}

export interface IEditAssetImageRepository {
  addImage (params: IEditAssetImageRepositoryParams): Promise<AssetImageModel>
}
