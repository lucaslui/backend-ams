import { IController } from '@/src/application/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadAssetsByUnitIdController } from '@/src/application/controllers/asset/load-assets-by-unitId-controller'
import { makeLoadAssetsByUnitId } from '../../usecases/asset/load-assets-by-unit-id-factory'

export const makeLoadAssetsByUnitIdController = (): IController => {
  const loadAssetsByUnitIdController = new LoadAssetsByUnitIdController(makeLoadAssetsByUnitId())
  return makeLogControllerDecorator(loadAssetsByUnitIdController)
}
