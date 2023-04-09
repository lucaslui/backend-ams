import { LoadCompanies } from '@/src/usecases/interactors/company/load-companies'
import { CompanyMongoRepository } from '@/src/infrastructure/repositories/mongodb/company-mongo-repository'
import { ILoadCompanies } from '@/src/usecases/boundaries/input/company/load-companies'

export const makeLoadCompanies = (): ILoadCompanies => {
  const companyMongoRepository = new CompanyMongoRepository()
  return new LoadCompanies(companyMongoRepository)
}
