export const editUnitSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Nome da unidade'
    },
    address: {
      type: 'object',
      properties: {
        cep: {
          type: 'string',
          description: 'CEP do endereço da unidade'
        },
        country: {
          type: 'string',
          description: 'País da unidade'
        },
        state: {
          type: 'string',
          description: 'Estado da unidade'
        },
        city: {
          type: 'string',
          description: 'Cidade da unidade'
        },
        street: {
          type: 'string',
          description: 'Endereço da unidade'
        },
        number: {
          type: 'string',
          description: 'Número do endereço da unidade'
        },
        complement: {
          type: 'string',
          description: 'Informações de complemento da unidade'
        }
      }
    }
  },
  example: {
    name: 'Unidade Piracicaba',
    address: {
      cep: '13.429-32',
      country: 'Brasil',
      state: 'São Paulo',
      city: 'Piracicaba',
      street: 'Rua João Lopes',
      number: '432',
      complement: 'Sem dados complementares'
    }
  },
  required: ['name', 'address']
}
