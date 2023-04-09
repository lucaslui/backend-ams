import { left, right } from '@/src/shared/either'
import { AddCompanyParams, AddCompanyReturn, IAddCompany } from '../../boundaries/input/company/add-company'
import { IAddCompanyRepository } from '../../boundaries/output/repositories/company/add-company-repository'
import { ILoadCompanyByNameRepository } from '../../boundaries/output/repositories/company/load-company-by-name-repository'

export class AddCompany implements IAddCompany {
  constructor (
    private readonly companiesRepository: ILoadCompanyByNameRepository & IAddCompanyRepository
  ) { }

  async add (params: AddCompanyParams): Promise<AddCompanyReturn> {
    const isCompanyNameInUse = await this.companiesRepository.loadByName(params.name)

    if (isCompanyNameInUse) {
      return left(new Error('The company name is already in use'))
    }
    const company = await this.companiesRepository.add({ name: params.name, cnpj: params.cnpj })

    return right(company)
  }
}
