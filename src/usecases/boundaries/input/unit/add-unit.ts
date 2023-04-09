import { AddressModel, UnitModel } from '@/src/entities/unit'
import { Either } from '@/src/shared/either'

export type AddUnitParams = {
  companyId: string
  name: string
  address: AddressModel
}

export type AddUnitReturn = Either<Error, UnitModel>

export interface IAddUnit {
  add (params: AddUnitParams): Promise<AddUnitReturn>
}
