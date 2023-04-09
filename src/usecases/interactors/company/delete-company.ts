import { DeleteCompanyParams, DeleteCompanyReturn, IDeleteCompany } from '@/src/usecases/boundaries/input/company/delete-company'
import { IDeleteCompanyRepository } from '../../boundaries/output/repositories/company/delete-company-repository'
import { ILoadCompanyByIdRepository } from '../../boundaries/output/repositories/company/load-company-by-id-repository'
import { left, right } from '@/src/shared/either'

export class DeleteCompany implements IDeleteCompany {
  constructor (
    private readonly companiesRepository: IDeleteCompanyRepository & ILoadCompanyByIdRepository
  ) { }

  async delete (params: DeleteCompanyParams): Promise<DeleteCompanyReturn> {
    const company = await this.companiesRepository.loadById(params.companyId)

    if (!company) {
      return left(new Error('Company not found'))
    }

    await this.companiesRepository.delete(params.companyId)

    return right(undefined)
  }
}
