import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { generateUnitListMock } from './mocks/unit'

describe('GET /v1/units', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    const unitsCollection = await MongoHelper.getCollection('units')
    await unitsCollection.deleteMany({})
  })

  it('Should be able to get unit list', async () => {
    const unitsCollection = await MongoHelper.getCollection('units')
    const unitList = generateUnitListMock(5)
    await unitsCollection.insertMany(unitList)
    const response = await request(app).get('/v1/units')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page).toHaveLength(5)
    expect(response.body.total).toBe(5)
    expect(response.body.page[0]).toHaveProperty('id')
    expect(response.body.page[0]).toHaveProperty('name')
    expect(response.body.page[0]).toHaveProperty('address')
    expect(response.body.page[0]).toHaveProperty('updatedAt')
    expect(response.body.page[0]).toHaveProperty('createdAt')
  })

  it('Should be able to get empty unit list', async () => {
    const response = await request(app).get('/v1/units')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page).toHaveLength(0)
    expect(response.body.total).toBe(0)
  })
})
