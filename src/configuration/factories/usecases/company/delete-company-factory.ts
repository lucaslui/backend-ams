import { IDeleteCompany } from '@/src/usecases/boundaries/input/company/delete-company'
import { DeleteCompany } from '@/src/usecases/interactors/company/delete-company'
import { CompanyMongoRepository } from '@/src/infrastructure/repositories/mongodb/company-mongo-repository'

export const makeDeleteCompany = (): IDeleteCompany => {
  const companyMongoRepository = new CompanyMongoRepository()
  return new DeleteCompany(companyMongoRepository)
}
