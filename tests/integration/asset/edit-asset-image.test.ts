import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { assetMock } from './mocks/asset'
import path from 'path'

const imagePath = path.join(__dirname, './mocks/image.jpg')

describe('PUT /v1/assets/image/:assetId', () => {
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

  it('Should be able to add an image to a asset', async () => {
    const assetsCollection = await MongoHelper.getCollection('assets')
    await assetsCollection.insertOne(assetMock)
    const response = await request(app)
      .put(`/v1/assets/image/${assetMock._id.toString()}`)
      .set('Content-Type', 'multipart/form-data')
      .attach('imageBinary', imagePath, 'image.jpg')
    expect(response.status).toBe(204)
  })
})
