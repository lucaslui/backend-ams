export const loadCompanyByIdPath = {
  tags: ['Companhias (Backoffice)'],
  summary: 'Obter dados de uma companhia',
  description: 'Essa rota só pode ser executada por **usuários administradores**',
  security: [{
    authAccessTokenSchema: []
  }],
  parameters: [{
    name: 'companyId',
    in: 'path',
    description: 'O identificador único da companhia',
    required: true,
    schema: {
      type: 'string'
    }
  }],
  responses: {
    200: {
      description: 'Ok: operação realizada com sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/entityCompanySchema'
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
