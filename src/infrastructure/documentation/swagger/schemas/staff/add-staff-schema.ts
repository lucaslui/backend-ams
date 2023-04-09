export const addStaffSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Nome do usuário de suporte'
    },
    email: {
      type: 'string',
      description: 'E-mail de cadastro do usuário'
    }
  },
  example: {
    name: 'any_name',
    email: 'any_email'
  },
  required: ['name', 'email']
}
