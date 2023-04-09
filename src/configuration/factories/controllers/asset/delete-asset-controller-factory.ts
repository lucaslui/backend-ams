import { DeleteAssetController } from '@/src/application/controllers/asset/delete-asset-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDeleteAsset } from '../../usecases/asset/delete-asset-factory'

export const makeDeleteAssetController = (): IController => {
  const deleteAssetController = new DeleteAssetController(makeDeleteAsset())
  return makeLogControllerDecorator(deleteAssetController)
}
