import { DeleteAssetParams } from '../../../input/asset/delete-asset'

export interface IDeleteAssetRepository {
  delete (params: DeleteAssetParams): Promise<void>
}
