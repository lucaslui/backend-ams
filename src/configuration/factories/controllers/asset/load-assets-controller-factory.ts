import { LoadAssetsController } from '@/src/application/controllers/asset/load-assets-controller'
import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeLoadAssets } from '../../usecases/asset/load-assets-factory'

export const makeLoadAssetsController = (): IController => {
  const loadAssetsController = new LoadAssetsController(makeLoadAssets())
  return makeLogControllerDecorator(loadAssetsController)
}
