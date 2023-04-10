export type DeleteUnitsByCompanyIdRepositoryParams = {
  companyId: string
}

export interface IDeleteUnitsByCompanyIdRepository {
  deleteByCompanyId (params: DeleteUnitsByCompanyIdRepositoryParams): Promise<void>
}
