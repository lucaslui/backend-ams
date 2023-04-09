export const serverErrorComponent = {
  description: 'Server Error: problema no servidor',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Internal server error'
          }
        }
      }
    }
  }
}
