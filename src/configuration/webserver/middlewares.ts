import { Express } from 'express'
import { bodyParser, contentType, cors } from '../../infrastructure/webserver/express/middlewares'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
