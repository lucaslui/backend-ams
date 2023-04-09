export const forbiddenComponent = {
  description: 'Forbidden: acesso negado',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Access denied'
          }
        }
      }
    }
  }
}
