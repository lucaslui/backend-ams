import { AddressModel, UnitModel } from '@/src/entities/unit'
import { Either } from '@/src/shared/either'

export type EditUnitParams = {
  companyId: string
  unitId: string
  name: string
  address: AddressModel
}

export type EditUnitReturn = Either<Error, UnitModel>

export interface IEditUnit {
  edit (params: EditUnitParams): Promise<EditUnitReturn>
}
