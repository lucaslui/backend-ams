export const addUserPath = {
  tags: ['Usuários'],
  summary: 'Adicionar usuário',
  description: 'Essa rota só pode ser executada por **usuários administradores**',
  security: [{
    authAccessTokenSchema: []
  }, {
    authCompanyIdSchema: []
  }],
  requestBody: {
    required: true,
    description: 'Informações necessárias para adicionar o usuário',
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addUserSchema'
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Ok: operação realizada com sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/entityUserSchema'
          }
        }
      }
    },
    400: {
      $ref: '#/components/badRequest'
    },
    401: {
      $ref: '#/components/unauthorized'
    },
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
