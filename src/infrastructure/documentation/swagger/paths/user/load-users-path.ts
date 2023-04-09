export const loadUsersPath = {
  tags: ['Usuários'],
  summary: 'Obter usuários',
  description: 'Essa rota só pode ser executada por **usuários administradores**',
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
                $ref: '#/schemas/loadUsersSchema'
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
