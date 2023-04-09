export type AssetModel = {
  id: string
  name: string
  description: string
  model: string
  owner: string
  status: 'running' | 'alerting'| 'stopped'
  health: number
  imageId: string
  unitId: string
  companyId: string
  updatedAt: string
  createdAt: string
}

export type AssetImageModel = {
  id: string
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}
