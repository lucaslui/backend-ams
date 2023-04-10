import { DeleteCompanyParams, DeleteCompanyReturn, IDeleteCompany } from '@/src/usecases/boundaries/input/company/delete-company'
import { IDeleteCompanyRepository } from '../../boundaries/output/repositories/company/delete-company-repository'
import { ILoadCompanyByIdRepository } from '../../boundaries/output/repositories/company/load-company-by-id-repository'
import { left, right } from '@/src/shared/either'
import { IDeleteUnitsByCompanyIdRepository } from '../../boundaries/output/repositories/unit/delete-units-by-company-id-repository'
import { IDeleteAssetsByCompanyIdRepository } from '../../boundaries/output/repositories/asset/delete-assets-by-company-id-repository'

export class DeleteCompany implements IDeleteCompany {
  constructor (
    private readonly companiesRepository: IDeleteCompanyRepository & ILoadCompanyByIdRepository,
    private readonly unitsRepository: IDeleteUnitsByCompanyIdRepository,
    private readonly assetsRepository: IDeleteAssetsByCompanyIdRepository
  ) { }

  async delete (params: DeleteCompanyParams): Promise<DeleteCompanyReturn> {
    const company = await this.companiesRepository.loadById(params.companyId)

    if (!company) {
      return left(new Error('Company not found'))
    }

    await this.companiesRepository.delete(params.companyId)
    await this.unitsRepository.deleteByCompanyId({ companyId: params.companyId })
    await this.assetsRepository.deleteByCompanyId({ companyId: params.companyId })

    return right(undefined)
  }
}
