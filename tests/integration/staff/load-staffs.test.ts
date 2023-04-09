import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { generateStaffListMock } from './mocks/staff'

describe('GET /v1/staffs', () => {
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

  it('Should be able to get staff list', async () => {
    const staffsCollection = await MongoHelper.getCollection('staffs')
    const staffList = generateStaffListMock(5)
    await staffsCollection.insertMany(staffList)
    const response = await request(app).get('/v1/staffs')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page).toHaveLength(5)
    expect(response.body.total).toBe(5)
    expect(response.body.page[0]).toHaveProperty('id')
    expect(response.body.page[0]).toHaveProperty('name')
    expect(response.body.page[0]).toHaveProperty('email')
    expect(response.body.page[0]).toHaveProperty('updatedAt')
    expect(response.body.page[0]).toHaveProperty('createdAt')
  })

  it('Should be able to get empty staff list', async () => {
    const response = await request(app).get('/v1/staffs')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page).toHaveLength(0)
    expect(response.body.total).toBe(0)
  })
})
