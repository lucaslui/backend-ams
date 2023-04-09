import { CompanyModel } from '@/src/entities/company'

export type AddCompanyRepositoryParams = {
  name: string
  cnpj: string
}

export interface IAddCompanyRepository {
  add (params: AddCompanyRepositoryParams): Promise<CompanyModel>
}
