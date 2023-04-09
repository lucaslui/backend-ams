import { AddressModel, UnitModel } from '@/src/entities/unit'
import { AddUnitParams } from '../../../input/unit/add-unit'

export type IAddUnitRepositoryParams = AddUnitParams & {
  name: string
  address: AddressModel
}

export interface IAddUnitRepository {
  add (params: IAddUnitRepositoryParams): Promise<UnitModel>
}
