import { CompanyModel } from '@/src/entities/company'
import { PaginateDataModel } from '@/src/entities/data'
import { ILoadCompanies } from '../../boundaries/input/company/load-companies'
import { ILoadCompaniesRepository } from '../../boundaries/output/repositories/company/load-companies-repository'

export class LoadCompanies implements ILoadCompanies {
  constructor (
    private readonly loadCompaniesRepository: ILoadCompaniesRepository
  ) {}

  async load (filter?: string, page?: number): Promise<PaginateDataModel<CompanyModel[]>> {
    const companies = await this.loadCompaniesRepository.load(filter, page)
    return companies
  }
}
