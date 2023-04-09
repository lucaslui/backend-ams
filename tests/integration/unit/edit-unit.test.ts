import request from 'supertest'

import app from '@/src/configuration/app'
import { MongoHelper } from '@/src/infrastructure/repositories/mongodb/mongo-helper'
import { editUnitMock, unitMock } from './mocks/unit'

describe('PUT /v1/units/:unitId', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  afterEach(async () => {
    const unitsCollection = await MongoHelper.getCollection('units')
    await unitsCollection.deleteMany({})
  })

  it('Should be able to edit a unit with id sent as path parameter', async () => {
    const unitsCollection = await MongoHelper.getCollection('units')
    await unitsCollection.insertOne(unitMock)
    const response = await request(app).put(`/v1/units/${unitMock._id.toString()}`).send(editUnitMock)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('address')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body.name).toBe(editUnitMock.name)
    expect(response.body.address).toStrictEqual(editUnitMock.address)
  })

  it('Should be returned "bad request" when "name" parameter is missed', async () => {
    const unitsCollection = await MongoHelper.getCollection('units')
    await unitsCollection.insertOne(unitMock)
    const { name, ...editUnitMockWithoutName } = editUnitMock
    const response = await request(app).put(`/v1/units/${unitMock._id.toString()}`).send(editUnitMockWithoutName)
    expect(response.status).toBe(400)
  })

  it('Should be returned "bad request" when "address" file is missed', async () => {
    const unitsCollection = await MongoHelper.getCollection('units')
    await unitsCollection.insertOne(unitMock)
    const { address, ...editUnitWithoutAddress } = editUnitMock
    const response = await request(app).put(`/v1/units/${unitMock._id.toString()}`).send(editUnitWithoutAddress)
    expect(response.status).toBe(400)
  })
})
