import { AddressModel, UnitModel } from '@/src/entities/unit'

export type EditUnitRepositoryParams = {
  companyId: string
  unitId: string
  name: string
  address: AddressModel
}

export interface IEditUnitRepository {
  edit (params: EditUnitRepositoryParams): Promise<UnitModel>
}
