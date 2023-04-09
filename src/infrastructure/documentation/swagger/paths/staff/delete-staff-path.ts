export const deleteStaffPath = {
  tags: ['Colaboradores (Backoffice)'],
  summary: 'Remover um colaborador',
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
  responses: {
    204: {
      description: 'No Content: operação realizada com sucesso'
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
