export type EditAssetImageIdRepositoryParams = {
  assetId: string
  imageId: string
}

export interface IEditAssetImageIdRepository {
  editImageId (params: EditAssetImageIdRepositoryParams): Promise<void>
}
