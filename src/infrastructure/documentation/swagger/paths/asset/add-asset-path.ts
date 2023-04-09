export const addAssetPath = {
  tags: ['Ativos'],
  summary: 'Adicionar ativo em uma unidade',
  description: 'Essa rota pode ser executada por **usuários administradores e operadores**',
  security: [{
    authAccessTokenSchema: []
  }, {
    authCompanyIdSchema: []
  }],
  parameters: [{
    name: 'unitId',
    in: 'path',
    description: 'O identificador único da unidade',
    required: true,
    schema: {
      type: 'string'
    }
  }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addAssetSchema'
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
            $ref: '#/schemas/entityAssetSchema'
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
