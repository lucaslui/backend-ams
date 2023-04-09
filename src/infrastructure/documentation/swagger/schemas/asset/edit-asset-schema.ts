export const editAssetSchema = {
  type: 'object',
  properties: {
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
    name: 'Ativo 1',
    description: 'Descrição do ativo 1',
    model: 'Modelo do ativo 1',
    owner: 'Responsável pelo ativo 1',
    status: 'running',
    health: 100
  },
  required: ['name', 'description', 'model', 'owner', 'status', 'health']
}
