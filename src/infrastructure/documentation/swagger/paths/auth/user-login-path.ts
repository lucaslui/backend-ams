export const userLoginPath = {
  tags: ['Autenticação'],
  summary: 'Autenticar usuário',
  description: 'Autenticar usuário para permitir acesso ao sistema',
  requestBody: {
    required: true,
    description: 'Informações necessárias para efetuar a autenticação',
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/loginSchema'
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
            $ref: '#/schemas/userAccountSchema'
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
