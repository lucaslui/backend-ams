import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { unitMock } from './mocks/unit'

describe('DELETE /v1/units/:unitId', () => {
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

  it('Should be able to delete an unit', async () => {
    const unitsCollection = await MongoHelper.getCollection('units')
    await unitsCollection.insertOne(unitMock)
    const response = await request(app)
      .delete(`/v1/units/${unitMock._id.toString()}`)
    expect(response.status).toBe(204)
  })

  it('Should be received "not found" when unit does not exist', async () => {
    const anyUnitRandomId = '5f9f1c9b9c9c9c9c9c9c9c9c'
    const response = await request(app).delete(`/v1/units/${anyUnitRandomId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Unit not found')
  })
})
