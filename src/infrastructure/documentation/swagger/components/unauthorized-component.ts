export const unauthorizedComponent = {
  description: 'Unauthorized: credenciais inválidas',
  content: {
    'application/json': {
      schema: {
        properties: {
          error: {
            type: 'string',
            example: 'Unauthorized Error'
          }
        }
      }
    }
  }
}
