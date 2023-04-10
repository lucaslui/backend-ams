
export type DeleteAssetsByUnitIdRepositoryParams = {
  unitId: string
}

export interface IDeleteAssetsByUnitIdRepository {
  deleteByUnitId(params: DeleteAssetsByUnitIdRepositoryParams): Promise<void>
}
