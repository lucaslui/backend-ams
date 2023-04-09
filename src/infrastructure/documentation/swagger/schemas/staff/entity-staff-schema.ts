export const entityStaffSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Identificador único do usuário de suporte'
    },
    name: {
      type: 'string',
      description: 'Nome do usuário de suporte'
    },
    email: {
      type: 'string',
      description: 'E-mail de cadastro do usuário de suporte'
    },
    updatedAt: {
      type: 'string',
      description: 'Data de atualização do usuário de suporte'
    },
    createdAt: {
      type: 'string',
      description: 'Data de criação do usuário de suporte'
    }
  },
  example: {
    id: '60e3b9e0-7b1b-11eb-9439-0242ac130003',
    name: 'any_name',
    email: 'any_email',
    updatedAt: '2022-03-30T17:06:18.471Z',
    createdAt: '2022-03-30T17:06:18.471Z'
  }
}
