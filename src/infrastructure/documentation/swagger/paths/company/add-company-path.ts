export const addCompanyPath = {
  tags: ['Companhias (Backoffice)'],
  summary: 'Criar uma compania',
  description: 'Essa rota pode ser executada por qualquer **colaborador**',
  security: [{
    authAccessTokenSchema: []
  }],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addCompanySchema'
        }
      }
    }
  },
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
