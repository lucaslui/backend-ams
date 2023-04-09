export type UnitModel = {
  id: string
  name: string
  address: AddressModel
  companyId: string
  updatedAt: string
  createdAt: string
}

export type AddressModel = {
  cep: string
  country: string
  state: string
  city: string
  street: string
  number: string
  complement: string
}
