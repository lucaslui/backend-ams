export const addUserSchema = {
  type: 'object',
  properties: {
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
    }
  },
  example: {
    name: 'any_name',
    email: 'any_email',
    role: 'any_role'
  },
  required: ['name', 'email', 'role']
}
