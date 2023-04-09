export const entityUserSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Identificador único do usuário'
    },
    name: {
      type: 'string',
      description: 'Nome do usuário'
    },
    email: {
      type: 'string',
      description: 'E-mail de cadastro do usuário'
    },
    role: {
      type: 'string',
      description: 'Função do usuário',
      enum: ['guest', 'operator', 'admin']
    },
    updatedAt: {
      type: 'string',
      description: 'Data de atualização do usuário'
    },
    createdAt: {
      type: 'string',
      description: 'Data de criação do usuário'
    }
  },
  example: {
    id: '60e3b9e0-7b1b-11eb-9439-0242ac130003',
    name: 'any_name',
    email: 'any_email',
    role: 'any_role',
    updatedAt: '2022-03-30T17:06:18.471Z',
    createdAt: '2022-03-30T17:06:18.471Z'
  }
}
