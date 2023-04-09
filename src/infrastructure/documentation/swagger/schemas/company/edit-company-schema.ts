export const editCompanySchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Nome da companhia'
    },
    cnpj: {
      type: 'string',
      description: 'CNPJ da companhia'
    }
  },
  example: {
    name: 'Industria Freios Supremos',
    cnpj: '23.201.649/0001-76'
  },
  required: ['name', 'cnpj']
}
