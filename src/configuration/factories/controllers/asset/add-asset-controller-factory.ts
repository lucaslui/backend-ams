import { AddAssetController } from '@/src/application/controllers/asset/add-asset-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddAsset } from '../../usecases/asset/add-asset-factory'
import { makeAddAssetValidation } from '../../validations/asset/add-asset-validation-factory'

export const makeAddAssetController = (): IController => {
  const addAssetController = new AddAssetController(makeAddAsset(), makeAddAssetValidation())
  return makeLogControllerDecorator(addAssetController)
}
