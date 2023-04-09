import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { editCompanyMock, companyMock } from './mocks/company'

describe('PUT /v1/companies/:companyId', () => {
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

  it('Should be able to edit a company with id sent as path parameter', async () => {
    const companiesCollection = await MongoHelper.getCollection('companies')
    await companiesCollection.insertOne(companyMock)
    const response = await request(app).put(`/v1/companies/${companyMock._id.toString()}`).send(editCompanyMock)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('cnpj')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body.name).toBe(editCompanyMock.name)
    expect(response.body.cnpj).toBe(editCompanyMock.cnpj)
  })

  it('Should be returned "bad request" when "name" parameter is missed', async () => {
    const companiesCollection = await MongoHelper.getCollection('companies')
    await companiesCollection.insertOne(companyMock)
    const { name, ...editUnitMockWithoutName } = editCompanyMock
    const response = await request(app).put(`/v1/companies/${companyMock._id.toString()}`).send(editUnitMockWithoutName)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "cnpj" file is missed', async () => {
    const companiesCollection = await MongoHelper.getCollection('companies')
    await companiesCollection.insertOne(companyMock)
    const { cnpj, ...editUnitWithoutCnpj } = editCompanyMock
    const response = await request(app).put(`/v1/companies/${companyMock._id.toString()}`).send(editUnitWithoutCnpj)
    expect(response.status).toBe(400)
  })

  it('Should be received "not found" when company does not exist', async () => {
    const anyUnitRandomId = '5f9f1c9b9c9c9c9c9c9c9c9c'
    const response = await request(app).put(`/v1/companies/${anyUnitRandomId}`).send(editCompanyMock)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')
    expect(response.body.error).toBe('Company not found')
  })
})
