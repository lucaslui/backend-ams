import { entityCompanySchema } from './entity-company-schema'

export const loadCompaniesSchema = {
  type: 'array',
  description: 'Lista de companhias',
  items: entityCompanySchema
}
