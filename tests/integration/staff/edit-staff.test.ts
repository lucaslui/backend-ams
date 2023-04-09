import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { editStaffMock, staffMock } from './mocks/staff'

describe('PUT /v1/staffs/:staffId', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    const staffsCollection = await MongoHelper.getCollection('staffs')
    await staffsCollection.deleteMany({})
  })

  it('Should be able to edit a staff with id sent as path parameter', async () => {
    const staffsCollection = await MongoHelper.getCollection('staffs')
    await staffsCollection.insertOne(staffMock)
    const response = await request(app).put(`/v1/staffs/${staffMock._id.toString()}`).send(editStaffMock)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body.name).toBe(editStaffMock.name)
    expect(response.body.email).toBe(editStaffMock.email)
  })

  it('Should be returned "bad request" when "name" field is missed', async () => {
    const staffsCollection = await MongoHelper.getCollection('staffs')
    await staffsCollection.insertOne(staffMock)
    const { name, ...staffWithoutName } = editStaffMock
    const response = await request(app).put(`/v1/staffs/${staffMock._id.toString()}`).send(staffWithoutName)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "email" field is missed', async () => {
    const staffsCollection = await MongoHelper.getCollection('staffs')
    await staffsCollection.insertOne(staffMock)
    const { email, ...staffWithoutEmail } = editStaffMock
    const response = await request(app).put(`/v1/staffs/${staffMock._id.toString()}`).send(staffWithoutEmail)
    expect(response.status).toBe(400)
  })

  it('Should be received "not found" when staff does not exist', async () => {
    const anyStaffRandomId = '642a08231204f726e4974256'
    const response = await request(app).put(`/v1/staffs/${anyStaffRandomId}`).send(editStaffMock)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Staff not found')
  })
})
