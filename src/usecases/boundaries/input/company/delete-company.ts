import { Either } from '@/src/shared/either'

export type DeleteCompanyParams = {
  companyId: string
}

export type DeleteCompanyReturn = Either<Error, void>

export interface IDeleteCompany {
  delete (params: DeleteCompanyParams): Promise<DeleteCompanyReturn>
}
