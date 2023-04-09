import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { companyMock } from './mocks/company'

describe('DELETE /v1/companies/:companyId', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    const companiesCollection = await MongoHelper.getCollection('companies')
    await companiesCollection.deleteMany({})
  })

  it('Should be able to delete an company', async () => {
    const companiesCollection = await MongoHelper.getCollection('companies')
    await companiesCollection.insertOne(companyMock)
    const response = await request(app).delete(`/v1/companies/${companyMock._id.toString()}`)
    expect(response.status).toBe(204)
  })

  it('Should be received "not found" when company does not exist', async () => {
    const anyUnitRandomId = '5f9f1c9b9c9c9c9c9c9c9c9c'
    const response = await request(app).delete(`/v1/companies/${anyUnitRandomId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Company not found')
  })
})
