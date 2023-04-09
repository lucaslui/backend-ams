import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { generateCompanyListMock } from './mocks/company'

describe('GET /v1/companies', () => {
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

  it('Should be able to get company list', async () => {
    const companiesCollection = await MongoHelper.getCollection('companies')
    const companyList = generateCompanyListMock(5)
    await companiesCollection.insertMany(companyList)
    const response = await request(app).get('/v1/companies')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page).toHaveLength(5)
    expect(response.body.total).toBe(5)
    expect(response.body.page[0]).toHaveProperty('id')
    expect(response.body.page[0]).toHaveProperty('name')
    expect(response.body.page[0]).toHaveProperty('cnpj')
    expect(response.body.page[0]).toHaveProperty('updatedAt')
    expect(response.body.page[0]).toHaveProperty('createdAt')
  })

  it('Should be able to get empty company list', async () => {
    const response = await request(app).get('/v1/companies')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('page')
    expect(response.body).toHaveProperty('total')
    expect(response.body.page).toHaveLength(0)
    expect(response.body.total).toBe(0)
  })
})
