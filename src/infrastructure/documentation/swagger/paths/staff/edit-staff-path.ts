export const editStaffPath = {
  tags: ['Colaboradores (Backoffice)'],
  summary: 'Editar um colaborador',
  description: 'Essa rota pode ser executada por qualquer **colaborador**',
  security: [{
    authAccessTokenSchema: []
  }],
  parameters: [{
    name: 'staffId',
    in: 'path',
    description: 'O identificador único do colaborador',
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
          $ref: '#/schemas/editStaffSchema'
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Ok: dados obtidos com sucesso',
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
    403: {
      $ref: '#/components/forbidden'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
