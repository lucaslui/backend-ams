export interface IHttpRequest {
  headers?: any
  body?: any
  params?: any
  query?: any
  userId?: string
  companyId?: string
  file?: any
}

export interface IHttpResponse {
  statusCode: number
  body?: any
  file?: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
  }
}
