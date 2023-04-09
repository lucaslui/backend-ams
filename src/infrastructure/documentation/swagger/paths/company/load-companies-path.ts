export const loadCompaniesPath = {
  tags: ['Companhias (Backoffice)'],
  summary: 'Obter lista de companhias',
  description: 'Essa rota pode ser executada por qualquer **colaborador**',
  security: [{
    authAccessTokenSchema: []
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
    description: 'A página de companhias desejada',
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
                $ref: '#/schemas/loadCompaniesSchema'
              },
              total: {
                type: 'integer',
                description: 'Número total de companhias',
                example: 1
              }
            }
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
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
