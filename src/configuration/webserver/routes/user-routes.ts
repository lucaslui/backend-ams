/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { makeAddUserController } from '../../factories/controllers/user/add-user-controller-factory'
import { adaptMiddleware } from '@/src/infrastructure/webserver/express/adapters/express-middleware-adapter'
import { makeUserAuthorizationMiddleware } from '../../factories/middlewares/user-authorization-middleware'
import { makeDeleteUserController } from '../../factories/controllers/user/delete-user-controller-factory'
import { makeEditUserController } from '../../factories/controllers/user/edit-user-controller-factory'
import { makeLoadUsersController } from '../../factories/controllers/user/load-users-controller-factory'

const router = Router()

router.post('/users',
  adaptMiddleware(makeUserAuthorizationMiddleware(['admin'])),
  adaptRoute(makeAddUserController()))

router.get('/users',
  adaptMiddleware(makeUserAuthorizationMiddleware(['admin'])),
  adaptRoute(makeLoadUsersController()))

router.put('/users/:userId',
  adaptMiddleware(makeUserAuthorizationMiddleware(['admin'])),
  adaptRoute(makeEditUserController()))

router.delete('/users/:userId',
  adaptMiddleware(makeUserAuthorizationMiddleware(['admin'])),
  adaptRoute(makeDeleteUserController()))

export { router as userRouter }
