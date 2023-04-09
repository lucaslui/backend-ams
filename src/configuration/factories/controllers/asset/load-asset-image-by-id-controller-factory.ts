import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadAssetImageByIdController } from '@/src/application/controllers/asset/load-asset-image-by-id-controller'
import { makeLoadAssetImageById } from '../../usecases/asset/load-asset-image-by-id-factory'

export const makeLoadAssetImageByIdController = (): IController => {
  const loadAssetImageByIdController = new LoadAssetImageByIdController(makeLoadAssetImageById())
  return makeLogControllerDecorator(loadAssetImageByIdController)
}
