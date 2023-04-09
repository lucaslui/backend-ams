export const editStaffSchema = {
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
    name: 'any_name',
    email: 'any_email'
  },
  required: ['name', 'email']
}
