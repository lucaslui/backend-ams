import { left, right } from '@/src/shared/either'
import { EditCompanyParams, EditCompanyReturn, IEditCompany } from '../../boundaries/input/company/edit-company'
import { IEditCompanyRepository } from '../../boundaries/output/repositories/company/edit-company-repository'
import { ILoadCompanyByIdRepository } from '../../boundaries/output/repositories/company/load-company-by-id-repository'

export class EditCompany implements IEditCompany {
  constructor (
    private readonly editHemsRegionRepository: IEditCompanyRepository,
    private readonly loadCompanyByIdRepository: ILoadCompanyByIdRepository
  ) {}

  async edit (params: EditCompanyParams, companyId: string): Promise<EditCompanyReturn> {
    const company = await this.loadCompanyByIdRepository.loadById(companyId)
    if (!company) {
      return left(new Error('Company not found'))
    }
    const newCompany = await this.editHemsRegionRepository.edit(params, companyId)
    return right(newCompany)
  }
}
