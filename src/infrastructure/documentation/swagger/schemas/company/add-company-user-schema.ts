export const addCompanyUserSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Nome do usuário'
    },
    email: {
      type: 'string',
      description: 'E-mail de cadastro do usuário'
    }
  },
  example: {
    name: 'Emerson',
    email: 'emerson@freios-supremos.com.br'
  },
  required: ['name', 'email']
}
