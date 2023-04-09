import { IController } from '../../../application/protocols'
import { LogControllerDecorator } from '../../../application/decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infrastructure/repositories/mongodb/log-mongo-repository'

export const makeLogControllerDecorator = (controller: IController): IController => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
