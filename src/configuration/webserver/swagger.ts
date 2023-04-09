import { Express } from 'express'
import { generateHTML, serve } from 'swagger-ui-express'

import swagger from '../../infrastructure/documentation/swagger'

import { noCacheControl } from '../../infrastructure/webserver/express/middlewares/no-cache'

export default (app: Express): void => {
  app.use('/docs', noCacheControl, serve, (req, res) => {
    const html = generateHTML(swagger)
    res.send(html)
  })
}
