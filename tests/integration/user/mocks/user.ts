import { ObjectID } from 'mongodb'
import { faker } from '@faker-js/faker'

const userMock = {
  _id: new ObjectID('5f9f1b9b9b9b9b9b9b9b9b9b'),
  name: 'any_name',
  email: 'any_email',
  role: 'any_role',
  password: 'any_password_hash',
  accessToken: 'any_token',
  companyId: 'any_company_id',
  createdAt: '2023-01-01T00:00:00',
  updatedAt: '2023-01-01T00:00:00'
}

const addUserMock = {
  name: 'added',
  email: 'added',
  role: 'added'
}

const editUserMock = {
  name: 'edited',
  email: 'edited',
  role: 'edited'
}

const generateUserListMock = (quantity: number): any[] => {
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

export { userMock, addUserMock, editUserMock, generateUserListMock }
