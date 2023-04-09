import { IController, IHttpRequest, IHttpResponse } from '../protocols'
import { LogErrorRepository } from '../../usecases/boundaries/output/repositories/log/log-error-repository'

export class LogControllerDecorator implements IController {
  constructor (
    private readonly controller: IController,
    private readonly logErrorRepository: LogErrorRepository
  ) { }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      console.error(httpResponse.body.stack)
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
