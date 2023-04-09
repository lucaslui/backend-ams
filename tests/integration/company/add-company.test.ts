import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { addCompanyMock } from './mocks/company'

describe('POST /v1/companies/:companyId', () => {
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

  it('Should be able to add an company', async () => {
    const response = await request(app).post('/v1/companies').send(addCompanyMock)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('cnpj')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body).toHaveProperty('createdAt')
  })

  it('Should be returned "bad request" when "name" field is missed', async () => {
    const { name, ...companyWithoutName } = addCompanyMock
    const response = await request(app).post('/v1/companies').send(companyWithoutName)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "cnpj" file is missed', async () => {
    const { cnpj, ...companyWithoutCnpj } = addCompanyMock
    const response = await request(app).post('/v1/companies').send(companyWithoutCnpj)
    expect(response.status).toBe(400)
  })
})
