import { CompanyMongoRepository } from '@/src/infrastructure/repositories/mongodb/company-mongo-repository'
import { ILoadCompanyById } from '@/src/usecases/boundaries/input/company/load-company-by-id'
import { LoadCompanyById } from '@/src/usecases/interactors/company/load-company-by-id'

export const makeLoadCompanyById = (): ILoadCompanyById => {
  const companyMongoRepository = new CompanyMongoRepository()
  return new LoadCompanyById(companyMongoRepository)
}
