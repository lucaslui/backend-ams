import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { addUnitMock } from './mocks/unit'

describe('POST /v1/units/:unitId', () => {
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

  it('Should be able to add an unit to a company', async () => {
    const response = await request(app).post('/v1/units').send(addUnitMock)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('address')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body).toHaveProperty('createdAt')
  })

  it('Should be returned "bad request" when "name" field is missed', async () => {
    const { name, ...unitWithoutName } = addUnitMock
    const response = await request(app).post('/v1/units').send(unitWithoutName)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "address" file is missed', async () => {
    const { address, ...unitWithoutAddress } = addUnitMock
    const response = await request(app).post('/v1/units').send(unitWithoutAddress)
    expect(response.status).toBe(400)
  })
})
