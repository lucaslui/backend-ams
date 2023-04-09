import { CompanyMongoRepository } from '@/src/infrastructure/repositories/mongodb/company-mongo-repository'
import { IEditCompany } from '@/src/usecases/boundaries/input/company/edit-company'
import { EditCompany } from '@/src/usecases/interactors/company/edit-company'

export const makeEditCompany = (): IEditCompany => {
  const companyMongoRepository = new CompanyMongoRepository()
  return new EditCompany(companyMongoRepository, companyMongoRepository)
}
