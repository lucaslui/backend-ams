import { ObjectID } from 'mongodb'
import { faker } from '@faker-js/faker'

const staffMock = {
  _id: new ObjectID('5f9f1b9b9b9b9b9b9b9b9b9b'),
  name: 'any_name',
  email: 'any_email',
  password: 'any_password_hash',
  accessToken: 'any_token',
  createdAt: '2023-01-01T00:00:00',
  updatedAt: '2023-01-01T00:00:00'
}

const addStaffMock = {
  name: 'added',
  email: 'added'
}

const editStaffMock = {
  name: 'edited',
  email: 'edited'
}

const generateStaffListMock = (quantity: number): any[] => {
  const unitList = []
  for (let i = 0; i < quantity; i++) {
    unitList.push({
      _id: new ObjectID(),
      name: faker.name.firstName(),
      email: faker.internet.email(),
      role: faker.name.jobTitle(),
      password: faker.internet.password(),
      accessToken: faker.internet.password(),
      companyId: 'any_company_id',
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    })
  }
  return unitList
}

export { staffMock, addStaffMock, editStaffMock, generateStaffListMock }
