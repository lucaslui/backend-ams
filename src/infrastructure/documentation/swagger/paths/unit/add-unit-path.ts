export const addUnitPath = {
  tags: ['Unidades'],
  summary: 'Adicionar unidade',
  description: 'Essa rota só pode ser executada por **usuários administradores**',
  security: [{
    authAccessTokenSchema: []
  }, {
    authCompanyIdSchema: []
  }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addUnitSchema'
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Ok: dados obtidos com sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/entityUnitSchema'
          }
        }
      }
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
