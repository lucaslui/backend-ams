import { EditAssetController } from '@/src/application/controllers/asset/edit-asset-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeEditAsset } from '../../usecases/asset/edit-asset-factory'
import { makeEditAssetValidation } from '../../validations/asset/edit-asset-validation-factory'

export const makeEditAssetController = (): IController => {
  const editAssetController = new EditAssetController(makeEditAsset(), makeEditAssetValidation())
  return makeLogControllerDecorator(editAssetController)
}
