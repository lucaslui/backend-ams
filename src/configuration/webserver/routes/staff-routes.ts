/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { makeStaffAuthorizationMiddleware } from '../../factories/middlewares/staff-authorization-middleware'
import { adaptMiddleware } from '@/src/infrastructure/webserver/express/adapters/express-middleware-adapter'
import { makeAddStaffController } from '../../factories/controllers/staff/add-staff-controller-factory'
import { makeDeleteStaffController } from '../../factories/controllers/staff/delete-staff-controller-factory'
import { makeEditStaffController } from '../../factories/controllers/staff/edit-staff-controller-factory'
import { makeLoadStaffsController } from '../../factories/controllers/staff/load-staffs-controller-factory'

const router = Router()

router.post('/staffs',
  adaptMiddleware(makeStaffAuthorizationMiddleware()),
  adaptRoute(makeAddStaffController()))

router.get('/staffs',
  adaptMiddleware(makeStaffAuthorizationMiddleware()),
  adaptRoute(makeLoadStaffsController()))

router.put('/staffs/:staffId',
  adaptMiddleware(makeStaffAuthorizationMiddleware()),
  adaptRoute(makeEditStaffController()))

router.delete('/staffs/:staffId',
  adaptMiddleware(makeStaffAuthorizationMiddleware()),
  adaptRoute(makeDeleteStaffController()))

export { router as staffRouter }
