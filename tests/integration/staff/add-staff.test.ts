import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { addStaffMock } from './mocks/staff'

describe('POST /v1/staffs', () => {
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

  it('Should be able to add an staff', async () => {
    const response = await request(app).post('/v1/staffs').send(addStaffMock)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body).toHaveProperty('createdAt')
  })

  it('Should be returned "bad request" when "name" field is missed', async () => {
    const { name, ...staffWithoutName } = addStaffMock
    const response = await request(app).post('/v1/staffs').send(staffWithoutName)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "email" is missed', async () => {
    const { email, ...staffWithoutEmail } = addStaffMock
    const response = await request(app).post('/v1/staffs').send(staffWithoutEmail)
    expect(response.status).toBe(400)
  })
})
