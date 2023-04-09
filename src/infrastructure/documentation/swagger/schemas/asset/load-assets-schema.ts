import { entityAssetSchema } from './entity-asset-schema'

export const loadAssetsSchema = {
  type: 'array',
  items: entityAssetSchema
}
