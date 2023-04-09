export const loadAssetsByUnitIdPath = {
  tags: ['Ativos'],
  summary: 'Obter ativos de uma unidade',
  description: 'Essa rota pode ser executada por **qualquer usuário**',
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
  }, {
    name: 'filter',
    in: 'query',
    description: 'Um texto para buscar',
    schema: {
      type: 'string'
    }
  }, {
    name: 'page',
    in: 'query',
    description: 'A página de unidades desejada',
    schema: {
      type: 'integer'
    }
  }],
  responses: {
    200: {
      description: 'Ok: operação realizada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              page: {
                $ref: '#/schemas/loadAssetsSchema'
              },
              total: {
                type: 'integer',
                description: 'Número total de usuários',
                example: 1
              }
            }
          }
        }
      }
    },
    403: {
      $ref: '#/components/forbidden'
    },
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
