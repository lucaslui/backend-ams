export const loadAssetImageByIdPath = {
  tags: ['Ativos'],
  summary: 'Obter a imagem de um ativo',
  description: 'Essa rota pode ser executada por **qualquer usuário**',
  security: [{
    authAccessTokenSchema: []
  }, {
    authCompanyIdSchema: []
  }],
  parameters: [{
    name: 'imageId',
    in: 'path',
    description: 'O identificador único da image',
    required: true,
    schema: {
      type: 'string'
    }
  }],
  responses: {
    200: {
      description: 'Ok: operação realizada com sucesso',
      content: {
        'image/png': {
          schema: {
            $ref: '#/schemas/siteImageSchema'
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
