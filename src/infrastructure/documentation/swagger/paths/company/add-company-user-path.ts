export const addCompanyUserPath = {
  tags: ['Companhias (Backoffice)'],
  summary: 'Convidar um usuário administrador para uma companhia',
  description: 'Essa rota pode ser executada por qualquer **colaborador**',
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
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addCompanyUserSchema'
        }
      }
    }
  },
  responses: {
    204: {
      description: 'No Content: vínculo realizado com sucesso'
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
