import { IDeleteCompany } from '@/src/usecases/boundaries/input/company/delete-company'
import { DeleteCompany } from '@/src/usecases/interactors/company/delete-company'
import { CompanyMongoRepository } from '@/src/infrastructure/repositories/mongodb/company-mongo-repository'
import { UnitMongoRepository } from '@/src/infrastructure/repositories/mongodb/unit-mongo-repository'
import { AssetMongoRepository } from '@/src/infrastructure/repositories/mongodb/asset-mongo-repository'

export const makeDeleteCompany = (): IDeleteCompany => {
  const companyMongoRepository = new CompanyMongoRepository()
  const unitMongoRepository = new UnitMongoRepository()
  const assetMongoRepository = new AssetMongoRepository()
  return new DeleteCompany(companyMongoRepository, unitMongoRepository, assetMongoRepository)
}
