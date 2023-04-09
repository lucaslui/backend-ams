import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { assetMock } from './mocks/asset'
import { imageMock } from './mocks/image'

describe('GET /v1/assets/image/:imageId', () => {
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

  it('Should be able to get image of asset with imageId as path parameter', async () => {
    const assetsCollection = await MongoHelper.getCollection('assets')
    await assetsCollection.insertOne(assetMock)
    const imagesCollection = await MongoHelper.getCollection('assets-images')
    await imagesCollection.insertOne(imageMock)
    const response = await request(app).get(`/v1/assets/image/${imageMock._id.toString()}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('buffer')
    expect(response.body).toHaveProperty('encoding')
    expect(response.body).toHaveProperty('fieldname')
    expect(response.body).toHaveProperty('mimetype')
    expect(response.body).toHaveProperty('originalname')
    expect(response.body).toHaveProperty('size')
  })

  it('Should be received "not found" when image does not exist', async () => {
    const wrongImageId = '5f9f1b9d9c1c9c0b8c8b9a7d'
    const response = await request(app).get(`/v1/assets/image/${wrongImageId}`)
    expect(response.status).toBe(404)
    expect(response.body).toStrictEqual({ error: 'Image not found' })
  })
})
