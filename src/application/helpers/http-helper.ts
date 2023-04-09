import { ServerError, UnauthorizedError } from '../errors'
import { IHttpResponse } from '../protocols/http'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error
})

export const forbidden = (error: Error): IHttpResponse => ({
  statusCode: 403,
  body: error
})

export const unauthorized = (): IHttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data
})

export const okFile = (file: any): IHttpResponse => ({
  statusCode: 200,
  file: file
})

export const noContent = (): IHttpResponse => ({
  statusCode: 204,
  body: null
})

export const notFound = (error?: Error): IHttpResponse => ({
  statusCode: 404,
  body: error || null
})
