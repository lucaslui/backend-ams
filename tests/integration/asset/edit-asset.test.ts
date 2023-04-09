import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { editSiteMock, assetMock } from './mocks/asset'

describe('PUT /v1/assets/:assetId', () => {
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

  it('Should be able to edit a asset with id sent as path parameter', async () => {
    const assetsCollection = await MongoHelper.getCollection('assets')
    await assetsCollection.insertOne(assetMock)
    const response = await request(app).put(`/v1/assets/${assetMock._id.toString()}`).send(editSiteMock)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('model')
    expect(response.body).toHaveProperty('owner')
    expect(response.body).toHaveProperty('status')
    expect(response.body).toHaveProperty('imageId')
    expect(response.body).toHaveProperty('unitId')
    expect(response.body).toHaveProperty('companyId')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body.name).toBe(editSiteMock.name)
    expect(response.body.description).toBe(editSiteMock.description)
    expect(response.body.model).toBe(editSiteMock.model)
    expect(response.body.owner).toBe(editSiteMock.owner)
    expect(response.body.status).toBe(editSiteMock.status)
    expect(response.body.health).toBe(editSiteMock.health)
  })

  it('Should be returned "bad request" when "name" parameter is missed', async () => {
    const assetsCollection = await MongoHelper.getCollection('assets')
    await assetsCollection.insertOne(assetMock)
    const { name, ...editSiteMockWithoutName } = editSiteMock
    const response = await request(app).put(`/v1/assets/${assetMock._id.toString()}`).send(editSiteMockWithoutName)
    expect(response.status).toBe(400)
  })
})
