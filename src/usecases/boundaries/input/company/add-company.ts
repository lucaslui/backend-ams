import { CompanyModel } from '@/src/entities/company'
import { Either } from '@/src/shared/either'

export type AddCompanyParams = {
  name: string
  cnpj: string
}

export type AddCompanyReturn = Either<Error, CompanyModel>

export interface IAddCompany {
  add (params: AddCompanyParams): Promise<AddCompanyReturn>
}
