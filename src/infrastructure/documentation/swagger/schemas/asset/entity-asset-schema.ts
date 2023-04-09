export const entityAssetSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Identificador do ativo'
    },
    name: {
      type: 'string',
      description: 'Nome do ativo'
    },
    description: {
      type: 'string',
      description: 'Descrição do ativo'
    },
    model: {
      type: 'string',
      description: 'Modelo do ativo'
    },
    owner: {
      type: 'string',
      description: 'Responsável pelo ativo'
    },
    status: {
      type: 'string',
      description: 'Estado de operação do ativo',
      enum: ['running', 'alerting', 'stopped']
    },
    health: {
      type: 'number',
      description: 'Estado de saúde do ativo',
      minimum: 0,
      maximum: 100
    }
  },
  example: {
    id: '60e3b9e0-7b1b-11eb-9439-0242ac130003',
    name: 'Ativo 1',
    description: 'Descrição do ativo 1',
    model: 'Modelo do ativo 1',
    owner: 'Responsável pelo ativo 1',
    status: 'running',
    health: 100,
    updatedAt: '2022-03-30T17:06:18.471Z',
    createdAt: '2022-03-30T17:06:18.471Z'
  }
}
