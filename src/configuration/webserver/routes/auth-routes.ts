/* eslint-disable @typescript-eslint/no-misused-promises */

import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { Router } from 'express'
import { makeStaffLoginController } from '../../factories/controllers/auth/staff-login-controller-factory'
import { makeUserLoginController } from '../../factories/controllers/auth/user-login-controller-factory'

const router = Router()

router.post('/login/user', adaptRoute(makeUserLoginController()))
router.post('/login/staff', adaptRoute(makeStaffLoginController()))

export { router as authRouter }
