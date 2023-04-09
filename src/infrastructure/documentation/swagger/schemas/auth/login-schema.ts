export const loginSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      description: 'E-mail de cadastro do usuário'
    },
    password: {
      type: 'string',
      description: 'Senha de cadastro do usuário'
    }
  },
  example: {
    email: 'any_email',
    password: 'any_password'
  },
  required: ['email', 'password']
}
