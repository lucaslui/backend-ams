export const addCompanySchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Nome da companhia'
    },
    cnpj: {
      type: 'string',
      description: 'CNPJ da companhia'
    },
    responsable: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Nome do responsável da companhia'
        },
        email: {
          type: 'string',
          description: 'Email do responsável da companhia'
        }
      }
    }
  },
  example: {
    name: 'Industria Freios Supremos',
    cnpj: '23.201.649/0001-76',
    responsable: {
      name: 'Emerson',
      email: 'emerson@freios-supremos.com.br'
    }
  },
  required: ['name', 'cnpj', 'responsable']
}
