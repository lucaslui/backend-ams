import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { userMock } from './mocks/user'

describe('DELETE /v1/users/:userId', () => {
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

  it('Should be able to delete an user', async () => {
    const usersCollection = await MongoHelper.getCollection('users')
    await usersCollection.insertOne(userMock)
    const response = await request(app).delete(`/v1/users/${userMock._id.toString()}`)
    expect(response.status).toBe(204)
  })

  it('Should be received "not found" when user does not exist', async () => {
    const anyUnitRandomId = '5f9f1c9b9c9c9c9c9c9c9c9c'
    const response = await request(app).delete(`/v1/users/${anyUnitRandomId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('User not found')
  })
})
