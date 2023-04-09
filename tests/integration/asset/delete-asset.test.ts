import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { assetMock } from './mocks/asset'
import { imageMock } from './mocks/image'

describe('DELETE /v1/assets/:assetId', () => {
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

  it('Should be able to delete an asset', async () => {
    const assetsCollection = await MongoHelper.getCollection('assets')
    await assetsCollection.insertOne(assetMock)
    const imagesCollection = await MongoHelper.getCollection('assets-images')
    await imagesCollection.insertOne(imageMock)
    const response = await request(app)
      .delete(`/v1/assets/${assetMock._id.toString()}`)
    expect(response.status).toBe(204)
  })

  it('Should be received "not found" when asset does not exist', async () => {
    const anyAssetRandomId = '5f9f1c9b9c9c9c9c9c9c9c9c'
    const response = await request(app).delete(`/v1/assets/${anyAssetRandomId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Asset not found')
  })
})
