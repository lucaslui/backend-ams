/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'

import { adaptMiddleware } from '@/src/infrastructure/webserver/express/adapters/express-middleware-adapter'
import { makeUserAuthorizationMiddleware } from '../../factories/middlewares/user-authorization-middleware'
import { makeAddAssetController } from '../../factories/controllers/asset/add-asset-controller-factory'
import { makeDeleteAssetController } from '../../factories/controllers/asset/delete-asset-controller-factory'
import { makeEditAssetController } from '../../factories/controllers/asset/edit-asset-controller-factory'
import { makeLoadAssetsController } from '../../factories/controllers/asset/load-assets-controller-factory'
import { makeLoadAssetsByUnitIdController } from '../../factories/controllers/asset/load-assets-by-unit-id-controller-factory'
import { makeEditAssetImageController } from '../../factories/controllers/asset/edit-asset-image-controller-factory'

import { upload } from '@/src/infrastructure/webserver/express/middlewares'
import { makeLoadAssetImageByIdController } from '../../factories/controllers/asset/load-asset-image-by-id-controller-factory'
import { CacheControl } from '@/src/infrastructure/webserver/express/middlewares/cache'

const router = Router()

router.post('/assets/:unitId',
  adaptMiddleware(makeUserAuthorizationMiddleware(['operator', 'admin'])),
  adaptRoute(makeAddAssetController()))

router.get('/assets/:unitId',
  adaptMiddleware(makeUserAuthorizationMiddleware(['guest', 'operator', 'admin'])),
  adaptRoute(makeLoadAssetsByUnitIdController()))

router.get('/assets',
  adaptMiddleware(makeUserAuthorizationMiddleware(['guest', 'operator', 'admin'])),
  adaptRoute(makeLoadAssetsController()))

router.get('/assets/image/:imageId',
  adaptMiddleware(makeUserAuthorizationMiddleware(['guest', 'operator', 'admin'])),
  CacheControl,
  adaptRoute(makeLoadAssetImageByIdController()))

router.put('/assets/image/:assetId',
  adaptMiddleware(makeUserAuthorizationMiddleware(['operator', 'admin'])),
  upload.single('imageBinary'),
  adaptRoute(makeEditAssetImageController()))

router.put('/assets/:assetId',
  adaptMiddleware(makeUserAuthorizationMiddleware(['operator', 'admin'])),
  adaptRoute(makeEditAssetController()))

router.delete('/assets/:assetId',
  adaptMiddleware(makeUserAuthorizationMiddleware(['operator', 'admin'])),
  adaptRoute(makeDeleteAssetController()))

export { router as assetRouter }
