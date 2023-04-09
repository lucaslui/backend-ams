import 'module-alias/register'

import { MongoHelper } from './infrastructure/repositories/mongodb/mongo-helper'

import env from './configuration/env'

(async () => {
  await MongoHelper.connect(env.mongoUrl)
  console.info('Conexão com o mongodb foi um sucesso!')
  const app = (await import('./configuration/app')).default
  app.set('port', env.port)
  app.listen(app.get('port'), env.host, () => console.info(`Servidor do backend rodando em http://${env.host}:${env.port}`))
})().catch(error => { console.log(error) })
