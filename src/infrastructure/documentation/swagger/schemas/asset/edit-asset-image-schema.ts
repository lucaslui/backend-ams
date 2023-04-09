export const editAssetImageSchema = {
  type: 'object',
  properties: {
    imageBinary: {
      type: 'string',
      description: 'Arquivo binário da imagem do ativo',
      format: 'binary'
    }
  },
  example: {
    imageBinary: 'Arquivo binário da imagem do ativo 1'
  },
  required: ['imageBinary']
}
