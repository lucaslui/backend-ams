import { IEditAssetImageRepository } from '../../boundaries/output/repositories/asset/edit-asset-image-repository'
import { IEditAssetImage, EditAssetImageParams } from '../../boundaries/input/asset/edit-asset-image'
import { IEditAssetImageIdRepository } from '../../boundaries/output/repositories/asset/edit-asset-image-id-repository'

export class EditAssetImage implements IEditAssetImage {
  constructor (
    private readonly assetsRepository: IEditAssetImageRepository & IEditAssetImageIdRepository
  ) {}

  async add (params: EditAssetImageParams): Promise<void> {
    const image = await this.assetsRepository.addImage({
      ...params.imageBinary
    })
    await this.assetsRepository.editImageId({ assetId: params.assetId, imageId: image.id })
  }
}
