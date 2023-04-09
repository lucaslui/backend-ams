import { CompanyModel } from '@/src/entities/company'
import { Either } from '@/src/shared/either'

export type EditCompanyParams = {
  name: string
  cnpj: string
}

export type EditCompanyReturn = Either<Error, CompanyModel>

export interface IEditCompany {
  edit (params: EditCompanyParams, companyId: string): Promise<EditCompanyReturn>
}
