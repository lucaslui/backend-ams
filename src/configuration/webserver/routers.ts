import { Express } from 'express'

import { authRouter } from './routes/auth-routes'
import { userRouter } from './routes/user-routes'
import { staffRouter } from './routes/staff-routes'
import { companyRouter } from './routes/company-routes'
import { unitRouter } from './routes/unit-routes'
import { assetRouter } from './routes/asset-routes'

export default (app: Express): void => {
  app.use('/v1', authRouter)

  app.use('/v1', userRouter)
  app.use('/v1', staffRouter)

  app.use('/v1', companyRouter)
  app.use('/v1', unitRouter)
  app.use('/v1', assetRouter)
}
