import { AssetImageModel } from '@/src/entities/asset'
import { ILoadAssetImageByIdRepository } from '../../boundaries/output/repositories/asset/load-asset-image-by-id-repository'
import { ILoadAssetImageById, LoadAssetImageByIdParams } from '../../boundaries/input/asset/load-asset-image-by-id'

export class LoadAssetImageById implements ILoadAssetImageById {
  constructor (
    private readonly assetsRepository: ILoadAssetImageByIdRepository
  ) {}

  async load (params: LoadAssetImageByIdParams): Promise<AssetImageModel> {
    const image = await this.assetsRepository.loadImage({ imageId: params.imageId })
    return image
  }
}
