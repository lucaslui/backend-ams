import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { staffMock } from './mocks/staff'

describe('DELETE /v1/staffs/:staffId', () => {
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

  it('Should be able to delete an staff', async () => {
    const staffsCollection = await MongoHelper.getCollection('staffs')
    await staffsCollection.insertOne(staffMock)
    const response = await request(app).delete(`/v1/staffs/${staffMock._id.toString()}`)
    expect(response.status).toBe(204)
  })

  it('Should be received "not found" when staff does not exist', async () => {
    const anyUnitRandomId = '5f9f1c9b9c9c9c9c9c9c9c9c'
    const response = await request(app).delete(`/v1/staffs/${anyUnitRandomId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Staff not found')
  })
})
