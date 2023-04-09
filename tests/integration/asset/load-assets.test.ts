import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { assetMock } from './mocks/asset'
import { imageMock } from './mocks/image'

describe('GET /v1/assets', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    const assetsCollection = await MongoHelper.getCollection('assets')
    const imagesCollection = await MongoHelper.getCollection('assets-images')
    await assetsCollection.deleteMany({})
    await imagesCollection.deleteMany({})
  })

  it('Should be able to get asset list', async () => {
    const assetsCollection = await MongoHelper.getCollection('assets')
    await assetsCollection.insertOne(assetMock)
    const response = await request(app).get('/v1/assets')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page).toHaveLength(1)
    expect(response.body.total).toBe(1)
    expect(response.body.page[0]).toHaveProperty('id')
    expect(response.body.page[0]).toHaveProperty('name')
    expect(response.body.page[0]).toHaveProperty('description')
    expect(response.body.page[0]).toHaveProperty('model')
    expect(response.body.page[0]).toHaveProperty('owner')
    expect(response.body.page[0]).toHaveProperty('status')
    expect(response.body.page[0]).toHaveProperty('imageId')
    expect(response.body.page[0]).toHaveProperty('unitId')
    expect(response.body.page[0]).toHaveProperty('companyId')
    expect(response.body.page[0]).toHaveProperty('updatedAt')
    expect(response.body.page[0]).toHaveProperty('createdAt')
  })

  it('Should be able to get empty asset list', async () => {
    const response = await request(app).get('/v1/assets')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page).toHaveLength(0)
    expect(response.body.total).toBe(0)
  })

  it('Should be able to get asset list with image id if that asset has an image', async () => {
    const assetsCollection = await MongoHelper.getCollection('assets')
    const imagesCollection = await MongoHelper.getCollection('assets-images')
    await assetsCollection.insertOne(assetMock)
    await imagesCollection.insertOne(imageMock)
    const response = await request(app).get('/v1/assets')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page[0]).toHaveProperty('imageId')
  })

  it("Should be able to get asset list without last image id when that asset doesn't have image", async () => {
    const assetsCollection = await MongoHelper.getCollection('assets')
    const { imageId, ...assetWithoutImage } = assetMock
    await assetsCollection.insertOne(assetWithoutImage)
    const response = await request(app).get('/v1/assets')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page[0]).not.toHaveProperty('imageId')
  })
})
