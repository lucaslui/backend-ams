export const deleteUnitPath = {
  tags: ['Unidades'],
  summary: 'Remover unidade',
  description: 'Essa rota só pode ser executada por **usuários administradores**',
  security: [{
    authAccessTokenSchema: []
  }, {
    authCompanyIdSchema: []
  }],
  parameters: [{
    name: 'unitId',
    in: 'path',
    description: 'O identificador único do companhia',
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
