import { AddCompany } from '@/src/usecases/interactors/company/add-company'
import { IAddCompany } from '@/src/usecases/boundaries/input/company/add-company'
import { CompanyMongoRepository } from '@/src/infrastructure/repositories/mongodb/company-mongo-repository'

export const makeAddCompany = (): IAddCompany => {
  const companyMongoRepository = new CompanyMongoRepository()
  return new AddCompany(companyMongoRepository)
}
