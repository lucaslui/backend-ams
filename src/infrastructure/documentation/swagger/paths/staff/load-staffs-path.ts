export const loadStaffsPath = {
  tags: ['Colaboradores (Backoffice)'],
  summary: 'Obter colaboradores',
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
                $ref: '#/schemas/loadStaffsSchema'
              },
              total: {
                type: 'integer',
                description: 'Número total de colaboradores',
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
