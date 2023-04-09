import { CompanyModel } from '@/src/entities/company'

export interface ILoadCompanyByIdRepository {
  loadById (companyId: string): Promise<CompanyModel>
}
