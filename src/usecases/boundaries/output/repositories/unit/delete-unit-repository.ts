import { DeleteUnitParams } from '../../../input/unit/delete-unit'

export interface IDeleteUnitRepository {
  delete (params: DeleteUnitParams): Promise<void>
}
