export const userAccountSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IhjSUA89.eyJpZCI6IjYwMDBhNmUxZmZlNGI0MDgwM'
    },
    companyId: {
      type: 'string',
      example: '642a048e4b5890228c2fb172'
    }
  }
}
