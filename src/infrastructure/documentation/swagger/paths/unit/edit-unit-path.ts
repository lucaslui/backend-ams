export const editUnitPath = {
  tags: ['Unidades'],
  summary: 'Editar uma unidade',
  description: 'Essa rota só pode ser executada por **usuários administradores**',
  security: [{
    authAccessTokenSchema: []
  }, {
    authCompanyIdSchema: []
  }],
  parameters: [{
    name: 'unitId',
    in: 'path',
    description: 'O identificador único da unidade',
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
          $ref: '#/schemas/editUnitSchema'
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
            $ref: '#/schemas/entityUnitSchema'
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
