export const editAssetImagePath = {
  tags: ['Ativos'],
  summary: 'Editar imagem de um ativo',
  description: 'Essa rota pode ser executada por **usuários administradores e operadores**',
  security: [{
    authAccessTokenSchema: []
  }, {
    authCompanyIdSchema: []
  }],
  parameters: [{
    name: 'assetId',
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
      'multipart/form-data': {
        schema: {
          $ref: '#/schemas/editAssetImageSchema'
        }
      }
    }
  },
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
