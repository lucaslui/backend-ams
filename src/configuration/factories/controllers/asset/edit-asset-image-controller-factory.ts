import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { EditAssetImageController } from '@/src/application/controllers/asset/edit-asset-image-controller'
import { makeEditAssetImage } from '../../usecases/asset/edit-asset-image-factory'

export const makeEditAssetImageController = (): IController => {
  const editAssetImageController = new EditAssetImageController(makeEditAssetImage())
  return makeLogControllerDecorator(editAssetImageController)
}
