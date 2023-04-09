import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { assetMock, addAssetMock } from './mocks/asset'

describe('POST /v1/assets/:unitId', () => {
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

  it('Should be able to add an asset to a unit', async () => {
    const response = await request(app).post(`/v1/assets/${assetMock.unitId}`).send(addAssetMock)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('model')
    expect(response.body).toHaveProperty('owner')
    expect(response.body).toHaveProperty('status')
    expect(response.body).toHaveProperty('health')
    expect(response.body).toHaveProperty('unitId')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body).toHaveProperty('createdAt')
  })

  it('Should be returned "bad request" when "name" field is missed', async () => {
    const { name, ...assetWithoutName } = addAssetMock
    const response = await request(app).post(`/v1/assets/${assetMock.unitId}`).send(assetWithoutName)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "description" file is missed', async () => {
    const { description, ...assetWithoutDescription } = addAssetMock
    const response = await request(app).post(`/v1/assets/${assetMock.unitId}`).send(assetWithoutDescription)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "model" file is missed', async () => {
    const { model, ...assetWithoutModel } = addAssetMock
    const response = await request(app).post(`/v1/assets/${assetMock.unitId}`).send(assetWithoutModel)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "owner" file is missed', async () => {
    const { owner, ...assetWithoutOwner } = addAssetMock
    const response = await request(app).post(`/v1/assets/${assetMock.unitId}`).send(assetWithoutOwner)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "status" file is missed', async () => {
    const { status, ...assetWithoutStatus } = addAssetMock
    const response = await request(app).post(`/v1/assets/${assetMock.unitId}`).send(assetWithoutStatus)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "health" file is missed', async () => {
    const { health, ...assetWithoutHealth } = addAssetMock
    const response = await request(app).post(`/v1/assets/${assetMock.unitId}`).send(assetWithoutHealth)
    expect(response.status).toBe(400)
  })
})
