export type DeleteAssetsByCompanyIdRepositoryParams = {
  companyId: string
}

export interface IDeleteAssetsByCompanyIdRepository {
  deleteByCompanyId(params: DeleteAssetsByCompanyIdRepositoryParams): Promise<void>
}
