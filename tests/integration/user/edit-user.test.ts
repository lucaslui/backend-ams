import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { editUserMock, userMock } from './mocks/user'

describe('PUT /v1/users/:userId', () => {
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

  it('Should be able to edit a user with id sent as path parameter', async () => {
    const usersCollection = await MongoHelper.getCollection('users')
    await usersCollection.insertOne(userMock)
    const response = await request(app).put(`/v1/users/${userMock._id.toString()}`).send(editUserMock)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('role')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body.name).toBe(editUserMock.name)
    expect(response.body.email).toBe(editUserMock.email)
    expect(response.body.role).toBe(editUserMock.role)
  })

  it('Should be returned "bad request" when "name" field is missed', async () => {
    const usersCollection = await MongoHelper.getCollection('users')
    await usersCollection.insertOne(userMock)
    const { name, ...userWithoutName } = editUserMock
    const response = await request(app).put(`/v1/users/${userMock._id.toString()}`).send(userWithoutName)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "email" file is missed', async () => {
    const usersCollection = await MongoHelper.getCollection('users')
    await usersCollection.insertOne(userMock)
    const { email, ...userWithoutEmail } = editUserMock
    const response = await request(app).put(`/v1/users/${userMock._id.toString()}`).send(userWithoutEmail)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "role" file is missed', async () => {
    const usersCollection = await MongoHelper.getCollection('users')
    await usersCollection.insertOne(userMock)
    const { role, ...userWithoutRole } = editUserMock
    const response = await request(app).put(`/v1/users/${userMock._id.toString()}`).send(userWithoutRole)
    expect(response.status).toBe(400)
  })

  it('Should be received "not found" when user does not exist', async () => {
    const anyUserRandomId = '642a08231204f726e4974256'
    const response = await request(app).put(`/v1/users/${anyUserRandomId}`).send(editUserMock)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('User not found')
  })
})
