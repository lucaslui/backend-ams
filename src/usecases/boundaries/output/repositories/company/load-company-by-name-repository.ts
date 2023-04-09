import { CompanyModel } from '@/src/entities/company'

export interface ILoadCompanyByNameRepository {
  loadByName (name: string): Promise<CompanyModel>
}
