export const addStaffPath = {
  tags: ['Colaboradores (Backoffice)'],
  summary: 'Adicionar colaborador',
  description: 'Essa rota pode ser executada por qualquer **colaborador**',
  security: [{
    authAccessTokenSchema: []
  }],
  requestBody: {
    required: true,
    description: 'Informações necessárias para adicionar o colaborador',
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addStaffSchema'
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
            $ref: '#/schemas/entityStaffSchema'
          }
        }
      }
    },
    400: {
      $ref: '#/components/badRequest'
    },
    401: {
      $ref: '#/components/unauthorized'
    },
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
