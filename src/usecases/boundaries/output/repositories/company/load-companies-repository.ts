import { CompanyModel } from '@/src/entities/company'
import { PaginateDataModel } from '@/src/entities/data'

export interface ILoadCompaniesRepository {
  load (filter?: string, page?: number): Promise<PaginateDataModel<CompanyModel[]>>
}
