import { ObjectID } from 'mongodb'
import { faker } from '@faker-js/faker'

const assetMock = {
  _id: new ObjectID('5f9f1b9b9b9b9b9b9b9b9b9b'),
  name: 'Máquina de Teste 1',
  description: 'Máquina da esteira de alimentos',
  model: 'WEG 1000W',
  owner: 'Julio Cesar',
  status: 'running',
  health: 80,
  imageId: '5f9f1b9b9b9b9b9b9b9b9b9b',
  unitId: 'unit1',
  companyId: 'any_company_id',
  createdAt: '2023-01-01T00:00:00',
  updatedAt: '2023-01-01T00:00:00'
}

const addAssetMock = {
  name: 'Máquina de Teste 1',
  description: 'Máquina da esteira de alimentos',
  model: 'WEG 1000W',
  owner: 'Julio Cesar',
  status: 'running',
  health: 80
}

const editSiteMock = {
  name: 'Máquina de Teste 2',
  description: 'Máquina da esteira de alimentos',
  model: 'WEG 1000W',
  owner: 'Julio Cesar',
  status: 'running',
  health: 80
}

const generateAssetListMock = (quantity: number, unitId: string = 'unit1'): any[] => {
  const siteList = []
  for (let i = 0; i < quantity; i++) {
    siteList.push({
      _id: new ObjectID(),
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      model: faker.lorem.word(),
      owner: faker.name.fullName(),
      status: faker.helpers.arrayElement(['running', 'alerting', 'stopped']),
      unitId,
      companyId: 'any_company_id',
      health: faker.random.numeric(2),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    })
  }
  return siteList
}

export { assetMock, addAssetMock, editSiteMock, generateAssetListMock }
