export type EditAssetImageParams = {
  companyId: string
  assetId: string
  imageBinary: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
  }
}

export interface IEditAssetImage {
  add (params: EditAssetImageParams): Promise<void>
}
