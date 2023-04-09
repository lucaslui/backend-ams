import { CompanyModel } from '@/src/entities/company'
import { Either } from '@/src/shared/either'

export type LoadCompanyByIdParams = {
  companyId: string
}

export type LoadCompanyByIdReturn = Either<Error, CompanyModel>

export interface ILoadCompanyById {
  loadById (params: LoadCompanyByIdParams): Promise<LoadCompanyByIdReturn>
}
