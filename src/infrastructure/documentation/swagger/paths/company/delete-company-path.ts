export const deleteCompanyPath = {
  tags: ['Companhias (Backoffice)'],
  summary: 'Remover uma companhia',
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
