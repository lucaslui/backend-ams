import { ObjectID } from 'mongodb'
import { faker } from '@faker-js/faker'

const companyMock = {
  _id: new ObjectID('5f9f1b9b9b9b9b9b9b9b9b9b'),
  name: 'site',
  cnpj: '13213123123123123',
  createdAt: '2023-01-01T00:00:00',
  updatedAt: '2023-01-01T00:00:00'
}

const addCompanyMock = {
  name: 'added',
  cnpj: 'added'
}

const editCompanyMock = {
  name: 'edited',
  cnpj: 'edited'
}

const generateCompanyListMock = (quantity: number): any[] => {
  const unitList = []
  for (let i = 0; i < quantity; i++) {
    unitList.push({
      _id: new ObjectID(),
      name: faker.name.firstName(),
      cnpj: faker.finance.account(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    })
  }
  return unitList
}

export { companyMock, addCompanyMock, editCompanyMock, generateCompanyListMock }
