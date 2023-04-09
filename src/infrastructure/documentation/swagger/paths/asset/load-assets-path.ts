export const loadAssetsPath = {
  tags: ['Ativos'],
  summary: 'Obter todos os ativos da companhia',
  description: 'Essa rota pode ser executada por **qualquer usuário**',
  security: [{
    authAccessTokenSchema: []
  }, {
    authCompanyIdSchema: []
  }],
  parameters: [{
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
                description: 'Número total de ativos',
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
