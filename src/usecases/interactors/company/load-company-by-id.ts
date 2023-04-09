import { ILoadCompanyById, LoadCompanyByIdParams, LoadCompanyByIdReturn } from '../../boundaries/input/company/load-company-by-id'
import { ILoadCompanyByIdRepository } from '../../boundaries/output/repositories/company/load-company-by-id-repository'
import { left, right } from '@/src/shared/either'

export class LoadCompanyById implements ILoadCompanyById {
  constructor (
    private readonly loadCompanyByIdRepository: ILoadCompanyByIdRepository
  ) {}

  async loadById (params: LoadCompanyByIdParams): Promise<LoadCompanyByIdReturn> {
    const company = await this.loadCompanyByIdRepository.loadById(params.companyId)

    if (!company) {
      return left(new Error('Company not found'))
    }

    return right(company)
  }
}
