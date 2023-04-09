import { AssetImageModel } from '@/src/entities/asset'

export type LoadAssetImageByIdRepositoryParams = {
  imageId: string
}

export interface ILoadAssetImageByIdRepository {
  loadImage (params: LoadAssetImageByIdRepositoryParams): Promise<AssetImageModel>
}
