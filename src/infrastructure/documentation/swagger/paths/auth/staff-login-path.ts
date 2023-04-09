export const staffLoginPath = {
  tags: ['Autenticação'],
  summary: 'Autenticar colaborador',
  description: 'Autenticar colaborador para permitir acesso ao sistema',
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
            $ref: '#/schemas/staffAccountSchema'
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
