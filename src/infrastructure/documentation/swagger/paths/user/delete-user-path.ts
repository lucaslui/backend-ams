export const deleteUserPath = {
  tags: ['Usuários'],
  summary: 'Remover usuário',
  description: 'Essa rota só pode ser executada por **usuários administradores**',
  security: [{
    authAccessTokenSchema: []
  }, {
    authCompanyIdSchema: []
  }],
  parameters: [{
    name: 'userId',
    in: 'path',
    description: 'O identificador único do companhia',
    required: true,
    schema: {
      type: 'string'
    }
  }],
  responses: {
    204: {
      description: 'No Content: operação realizada com sucesso'
    },
    400: {
      $ref: '#/components/badRequest'
    },
    403: {
      $ref: '#/components/forbidden'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
