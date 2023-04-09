import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { addUserMock } from './mocks/user'

describe('POST /v1/users', () => {
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

  it('Should be able to add an user', async () => {
    const response = await request(app).post('/v1/users').send(addUserMock)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('role')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body).toHaveProperty('createdAt')
  })

  it('Should be returned "bad request" when "name" field is missed', async () => {
    const { name, ...userWithoutName } = addUserMock
    const response = await request(app).post('/v1/users').send(userWithoutName)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "email" file is missed', async () => {
    const { email, ...userWithoutEmail } = addUserMock
    const response = await request(app).post('/v1/users').send(userWithoutEmail)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "role" file is missed', async () => {
    const { role, ...userWithoutRole } = addUserMock
    const response = await request(app).post('/v1/users').send(userWithoutRole)
    expect(response.status).toBe(400)
  })
})
