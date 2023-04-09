import { IHttpRequest, IMiddleware } from '@/src/application/protocols'
import { NextFunction, Request, Response } from 'express'

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = {
      headers: req.headers,
      params: req.params,
      userId: req.userId,
      companyId: req.companyId
    }

    const httpResponse = await middleware.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
