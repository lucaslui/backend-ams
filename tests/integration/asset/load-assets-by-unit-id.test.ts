import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { generateAssetListMock } from './mocks/asset'

describe('GET /v1/assets/:unitId', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    const assetsCollection = await MongoHelper.getCollection('assets')
    await assetsCollection.deleteMany({})
  })

  it('Should be able to get asset list of just an specified unit', async () => {
    const assetsCollection = await MongoHelper.getCollection('assets')
    const unitsInUnit1 = generateAssetListMock(5, 'unit1')
    await assetsCollection.insertMany(unitsInUnit1)
    const unitsInUnit2 = generateAssetListMock(3, 'unit2')
    await assetsCollection.insertMany(unitsInUnit2)
    const response1 = await request(app).get('/v1/assets/unit1')
    expect(response1.status).toBe(200)
    expect(response1.body).toHaveProperty('page')
    expect(response1.body).toHaveProperty('total')
    expect(response1.body.page).toHaveLength(5)
    expect(response1.body.total).toBe(5)
    const response2 = await request(app).get('/v1/assets/unit2')
    expect(response2.status).toBe(200)
    expect(response2.body).toHaveProperty('page')
    expect(response2.body).toHaveProperty('total')
    expect(response2.body.page).toHaveLength(3)
    expect(response2.body.total).toBe(3)
  })

  it('Should be able to get empty asset list', async () => {
    const response = await request(app).get('/v1/assets/unit1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page).toHaveLength(0)
    expect(response.body.total).toBe(0)
  })
})
