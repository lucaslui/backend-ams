export interface IHttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpRequest = {
  url: string
  method: HttpMethod
  params?: any
  body?: any
  headers?: any
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}
