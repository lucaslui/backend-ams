import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { generateUserListMock } from './mocks/user'

describe('GET /v1/users', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    const usersCollection = await MongoHelper.getCollection('users')
    await usersCollection.deleteMany({})
  })

  it('Should be able to get user list', async () => {
    const usersCollection = await MongoHelper.getCollection('users')
    const userList = generateUserListMock(5)
    await usersCollection.insertMany(userList)
    const response = await request(app).get('/v1/users')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page).toHaveLength(5)
    expect(response.body.total).toBe(5)
    expect(response.body.page[0]).toHaveProperty('id')
    expect(response.body.page[0]).toHaveProperty('name')
    expect(response.body.page[0]).toHaveProperty('email')
    expect(response.body.page[0]).toHaveProperty('role')
    expect(response.body.page[0]).toHaveProperty('updatedAt')
    expect(response.body.page[0]).toHaveProperty('createdAt')
  })

  it('Should be able to get empty user list', async () => {
    const response = await request(app).get('/v1/users')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page).toHaveLength(0)
    expect(response.body.total).toBe(0)
  })
})
