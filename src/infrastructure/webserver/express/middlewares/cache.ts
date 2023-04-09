import { Request, Response, NextFunction } from 'express'

export const CacheControl = (req: Request,res: Response, next: NextFunction): void => {
  res.set('Cache-Control', 'public, max-age=3600')
  next()
}
