import { ObjectID } from 'mongodb'
import { faker } from '@faker-js/faker'

const unitMock = {
  _id: new ObjectID('5f9f1b9b9b9b9b9b9b9b9b9b'),
  name: 'site',
  address: {
    cep: '00000-000',
    street: 'Rua XXX XXXXXX',
    number: '0000',
    complement: 'XXXX',
    city: 'XXXXXXXXXXXX',
    state: 'XXX XXXXXXX',
    country: 'XXXXX'
  },
  companyId: 'any_company_id',
  createdAt: '2023-01-01T00:00:00',
  updatedAt: '2023-01-01T00:00:00'
}

const addUnitMock = {
  name: 'added',
  address: {
    cep: 'added',
    street: 'added',
    number: 'added',
    complement: 'added',
    city: 'added',
    state: 'added',
    country: 'added'
  }
}

const editUnitMock = {
  name: 'edited',
  address: {
    cep: 'edited',
    street: 'edited',
    number: 'edited',
    complement: 'edited',
    city: 'edited',
    state: 'edited',
    country: 'edited'
  }
}

const generateUnitListMock = (quantity: number): any[] => {
  const unitList = []
  for (let i = 0; i < quantity; i++) {
    unitList.push({
      _id: new ObjectID(),
      name: faker.name.firstName(),
      address: {
        cep: faker.address.zipCode(),
        street: faker.address.street(),
        number: faker.address.buildingNumber(),
        complement: faker.address.secondaryAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country()
      },
      companyId: 'any_company_id',
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    })
  }
  return unitList
}

export { unitMock, addUnitMock, editUnitMock, generateUnitListMock }
