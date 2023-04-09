import express from 'express'
import setupMiddlewares from './webserver/middlewares'
import setupRoutes from './webserver/routers'
import setupSwagger from './webserver/swagger'

const app = express()

setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)

// app.get(/^(?!.*test)/, (req, res) => {
//   res.redirect('/docs')
// })

export default app
