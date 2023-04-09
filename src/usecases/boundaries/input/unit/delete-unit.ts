import { Either } from '@/src/shared/either'

export type DeleteUnitParams = {
  companyId: string
  unitId: string
}

export type DeleteUnitReturn = Either<Error, void>

export interface IDeleteUnit {
  delete (params: DeleteUnitParams): Promise<DeleteUnitReturn>
}
