export const badRequestComponent = {
  description: 'Bad Request: requisição inválida',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Missing param: <any param>'
          }
        }
      }
    }
  }
}
