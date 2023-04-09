export const deleteAssetPath = {
  tags: ['Ativos'],
  summary: 'Remover ativo',
  description: 'Essa rota pode ser executada por **usuários administradores e operadores**',
  security: [{
    authAccessTokenSchema: []
  }, {
    authCompanyIdSchema: []
  }],
  parameters: [{
    name: 'assetId',
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
