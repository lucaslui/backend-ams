import { IDeleteCompanyRepository } from '@/src/usecases/boundaries/output/repositories/company/delete-company-repository'
import { ILoadCompaniesRepository } from '@/src/usecases/boundaries/output/repositories/company/load-companies-repository'
import { IAddCompanyRepository } from '@/src/usecases/boundaries/output/repositories/company/add-company-repository'
import { IEditCompanyRepository } from '@/src/usecases/boundaries/output/repositories/company/edit-company-repository'
import { CompanyModel } from '@/src/entities/company'
import { AddCompanyParams } from '@/src/usecases/boundaries/input/company/add-company'
import { EditCompanyParams } from '@/src/usecases/boundaries/input/company/edit-company'
import { ILoadCompanyByIdRepository } from '@/src/usecases/boundaries/output/repositories/company/load-company-by-id-repository'
import { ILoadCompanyByCnpjRepository } from '@/src/usecases/boundaries/output/repositories/company/load-company-by-cnpj-repository'

import { MongoHelper } from './mongo-helper'
import { ILoadCompanyByNameRepository } from '@/src/usecases/boundaries/output/repositories/company/load-company-by-name-repository'
import { PaginateDataModel } from '@/src/entities/data'

export class CompanyMongoRepository implements
IAddCompanyRepository,
IDeleteCompanyRepository,
IEditCompanyRepository,
ILoadCompanyByIdRepository,
ILoadCompanyByCnpjRepository,
ILoadCompanyByNameRepository,
ILoadCompaniesRepository {
  async add (params: AddCompanyParams): Promise<CompanyModel> {
    const companiesCollection = await MongoHelper.getCollection('companies')
    const result = await companiesCollection.insertOne({
      name: params.name,
      cnpj: params.cnpj,
      updatedAt: new Date(),
      createdAt: new Date()
    })
    const company = result.ops[0]
    return MongoHelper.map(company)
  }

  async edit (params: EditCompanyParams, companyId: string): Promise<CompanyModel> {
    const companiesCollection = await MongoHelper.getCollection('companies')
    const newCompany = await companiesCollection.findOneAndUpdate({ _id: MongoHelper.toObjectId(companyId) }, {
      $set: {
        name: params.name,
        cnpj: params.cnpj,
        updatedAt: new Date()
      }
    }, { returnDocument: 'after' })
    return MongoHelper.map(newCompany.value)
  }

  async load (filter?: string, page?: number): Promise<PaginateDataModel<CompanyModel[]>> {
    const companiesCollection = await MongoHelper.getCollection('companies')
    const pipeline: object[] = []

    if (filter) {
      const query = { name: { $regex: filter, $options: 'i' } }
      pipeline.push({
        $match: query
      })
    }

    pipeline.push({
      $project: {
        _id: false,
        id: '$_id',
        name: '$name',
        cnpj: '$cnpj',
        updatedAt: '$updatedAt',
        createdAt: '$createdAt'
      }
    })

    pipeline.push({
      $sort: { createdAt: -1 }
    })

    if (page) {
      pipeline.push({ $skip: page * 10 - 10 }, { $limit: 10 })
    }

    const companies = await companiesCollection.aggregate(pipeline).toArray()
    const companiesTotal = await companiesCollection.countDocuments()
    return {
      page: companies,
      total: companiesTotal
    }
  }

  async loadById (companyId: string): Promise<CompanyModel> {
    const collectorsCollection = await MongoHelper.getCollection('companies')
    const company = await collectorsCollection.findOne({ _id: MongoHelper.toObjectId(companyId) })
    return company && MongoHelper.map(company)
  }

  async loadByCnpj (cnpj: string): Promise<CompanyModel> {
    const collectorsCollection = await MongoHelper.getCollection('companies')
    const company = await collectorsCollection.findOne({ cnpj })
    return company && MongoHelper.map(company)
  }

  async loadByName (name: string): Promise<CompanyModel> {
    const collectorsCollection = await MongoHelper.getCollection('companies')
    const company = await collectorsCollection.findOne({ name })
    return company && MongoHelper.map(company)
  }

  async delete (companyId: string): Promise<void> {
    const companiesCollection = await MongoHelper.getCollection('companies')
    await companiesCollection.deleteOne({ _id: MongoHelper.toObjectId(companyId) })
  }
}
