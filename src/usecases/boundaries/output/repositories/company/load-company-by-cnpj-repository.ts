import { CompanyModel } from '@/src/entities/company'

export interface ILoadCompanyByCnpjRepository {
  loadByCnpj (cnpj: string): Promise<CompanyModel>
}
