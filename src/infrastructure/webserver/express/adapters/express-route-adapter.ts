import { IController, IHttpRequest } from '@/src/application/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: IController) => {
  return async (req: Request,res: Response) => {
    const httpRequest: IHttpRequest = {
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
      file: req.file,
      userId: req.userId,
      companyId: req.companyId
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      if (httpResponse.file) {
        // res.status(httpResponse.statusCode)
        // res.set('Content-Type', httpResponse.file.mimetype)
        // res.set('Content-Disposition', `attachment: filename="${httpResponse.file.originalname}"`)
        // res.end(httpResponse.file.buffer.buffer)
        res.status(httpResponse.statusCode).json(httpResponse.file)
      } else {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      }
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body?.message
      })
    }
  }
}
