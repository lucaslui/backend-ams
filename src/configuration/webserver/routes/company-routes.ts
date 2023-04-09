/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/src/infrastructure/webserver/express/adapters/express-route-adapter'
import { adaptMiddleware } from '@/src/infrastructure/webserver/express/adapters/express-middleware-adapter'
import { makeAddCompanyController } from '../../factories/controllers/company/add-company-controller-factory'
import { makeDeleteCompanyController } from '../../factories/controllers/company/delete-company-controller-factory'
import { makeEditCompanyController } from '../../factories/controllers/company/edit-company-controller-factory'
import { makeLoadCompaniesController } from '../../factories/controllers/company/load-companies-controller-factory'
import { makeLoadCompanyByIdController } from '../../factories/controllers/company/load-company-by-id-controller-factory'
import { makeStaffAuthorizationMiddleware } from '../../factories/middlewares/staff-authorization-middleware'
import { makeAddCompanyUserController } from '../../factories/controllers/company/add-company-user-controller-factory'

const router = Router()

router.post('/companies', adaptMiddleware(makeStaffAuthorizationMiddleware()), adaptRoute(makeAddCompanyController()))
router.get('/companies', adaptMiddleware(makeStaffAuthorizationMiddleware()), adaptRoute(makeLoadCompaniesController()))
router.post('/companies/admin/:companyId', adaptMiddleware(makeStaffAuthorizationMiddleware()), adaptRoute(makeAddCompanyUserController()))
router.get('/companies/:companyId', adaptMiddleware(makeStaffAuthorizationMiddleware()), adaptRoute(makeLoadCompanyByIdController()))
router.put('/companies/:companyId', adaptMiddleware(makeStaffAuthorizationMiddleware()), adaptRoute(makeEditCompanyController()))
router.delete('/companies/:companyId', adaptMiddleware(makeStaffAuthorizationMiddleware()), adaptRoute(makeDeleteCompanyController()))

export { router as companyRouter }
