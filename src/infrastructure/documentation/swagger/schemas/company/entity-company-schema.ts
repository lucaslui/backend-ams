export const entityCompanySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Identificação única da companhia'
    },
    name: {
      type: 'string',
      description: 'Nome da companhia'
    },
    cnpj: {
      type: 'string',
      description: 'CNPJ da companhia'
    },
    updatedAt: {
      type: 'string',
      description: 'Data que a companhia foi atualizada'
    },
    createdAt: {
      type: 'string',
      description: 'Data que a companhia foi criada'
    }
  },
  example: {
    id: '613105f170ad960072982745',
    name: 'Industria Freios Supremos',
    cnpj: '23.201.649/0001-76',
    updatedAt: '2022-03-30T17:06:18.471Z',
    createdAt: '2022-03-30T17:06:18.471Z'
  }
}
