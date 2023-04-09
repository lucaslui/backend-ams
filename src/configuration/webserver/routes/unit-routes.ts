/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { makeLoadUnitsController } from '../../factories/controllers/unit/load-units-controller-factory'
import { makeAddUnitController } from '../../factories/controllers/unit/add-unit-controller-factory'
import { makeDeleteUnitController } from '../../factories/controllers/unit/delete-unit-controller-factory'
import { makeEditUnitController } from '../../factories/controllers/unit/edit-unit-controller-factory'
import { adaptMiddleware } from '@/src/infrastructure/webserver/express/adapters/express-middleware-adapter'
import { makeUserAuthorizationMiddleware } from '../../factories/middlewares/user-authorization-middleware'

const router = Router()

router.post('/units',
  adaptMiddleware(makeUserAuthorizationMiddleware(['admin'])),
  adaptRoute(makeAddUnitController()))

router.get('/units',
  adaptMiddleware(makeUserAuthorizationMiddleware(['guest', 'operator', 'admin'])),
  adaptRoute(makeLoadUnitsController()))

router.put('/units/:unitId',
  adaptMiddleware(makeUserAuthorizationMiddleware(['admin'])),
  adaptRoute(makeEditUnitController()))

router.delete('/units/:unitId',
  adaptMiddleware(makeUserAuthorizationMiddleware(['admin'])),
  adaptRoute(makeDeleteUnitController()))

export { router as unitRouter }
