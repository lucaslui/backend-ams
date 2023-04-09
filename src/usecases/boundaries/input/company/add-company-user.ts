import { Either } from '@/src/shared/either'

export type AddCompanyUserParams = {
  companyId: string
  name: string
  email: string
}

export type AddCompanyUserReturn = Either<Error, undefined>

export interface IAddCompanyUser {
  add (params: AddCompanyUserParams): Promise<AddCompanyUserReturn>
}
