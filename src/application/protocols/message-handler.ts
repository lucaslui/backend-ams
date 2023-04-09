export type Result = {
  status: 'successful' | 'error'
  error?: Error
}

export interface IMessageHandler {
  handle (message: any): Promise<Result>
}
