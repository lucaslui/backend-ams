import { MongoHelper } from './mongo-helper'
import { ILoadUnitsRepository } from '@/src/usecases/boundaries/output/repositories/unit/load-units-repository'
import { UnitModel } from '@/src/entities/unit'
import { ILoadUnitByIdRepository } from '@/src/usecases/boundaries/output/repositories/unit/load-unit-by-id-repository'
import { IAddUnitRepository, IAddUnitRepositoryParams } from '@/src/usecases/boundaries/output/repositories/unit/add-unit-repository'
import { EditUnitRepositoryParams, IEditUnitRepository } from '@/src/usecases/boundaries/output/repositories/unit/edit-unit-repository'
import { ILoadUnitByNameRepository, LoadUnitByNameParams } from '@/src/usecases/boundaries/output/repositories/unit/load-unit-by-name-repository'
import { IDeleteUnitRepository } from '@/src/usecases/boundaries/output/repositories/unit/delete-unit-repository'
import { DeleteUnitParams } from '@/src/usecases/boundaries/input/unit/delete-unit'
import { ILoadUnitsByIdListRepository } from '@/src/usecases/boundaries/output/repositories/unit/load-units-by-id-list-repository'
import { LoadUnitsParams } from '@/src/usecases/boundaries/input/unit/load-units'
import { PaginateDataModel } from '@/src/entities/data'

export class UnitsMongoRepository implements
IAddUnitRepository,
IEditUnitRepository,
ILoadUnitsRepository,
ILoadUnitsByIdListRepository,
ILoadUnitByIdRepository,
ILoadUnitByNameRepository,
IDeleteUnitRepository {
  async add (params: IAddUnitRepositoryParams): Promise<UnitModel> {
    const unitsCollection = await MongoHelper.getCollection('units')
    const result = await unitsCollection.insertOne({
      name: params.name,
      address: {
        cep: params.address.cep,
        country: params.address.country,
        state: params.address.state,
        city: params.address.city,
        street: params.address.street,
        number: params.address.number,
        complement: params.address.complement
      },
      companyId: params.companyId,
      updatedAt: new Date(),
      createdAt: new Date()
    })
    return MongoHelper.map(result.ops[0])
  }

  async edit (params: EditUnitRepositoryParams): Promise<UnitModel> {
    const unitsCollection = await MongoHelper.getCollection('units')
    const newUnit = await unitsCollection.findOneAndUpdate({ _id: MongoHelper.toObjectId(params.unitId) }, {
      $set: {
        name: params.name,
        address: {
          cep: params.address.cep,
          country: params.address.country,
          state: params.address.state,
          city: params.address.city,
          street: params.address.street,
          number: params.address.number,
          complement: params.address.complement
        },
        updatedAt: new Date()
      }
    }, {
      returnDocument: 'after'
    })
    return MongoHelper.map(newUnit.value)
  }

  async load (params: LoadUnitsParams): Promise<PaginateDataModel<UnitModel[]>> {
    const unitsCollection = await MongoHelper.getCollection('units')
    const pipeline: object[] = []

    const query = params.filter !== undefined ? { companyId: params.companyId, name: { $regex: params.filter, $options: 'i' } } : { companyId: params.companyId }

    pipeline.push({
      $match: query
    })

    pipeline.push({
      $project: {
        _id: false,
        id: '$_id',
        name: '$name',
        address: '$address',
        updatedAt: '$updatedAt',
        createdAt: '$createdAt'
      }
    })

    pipeline.push({
      $sort: { createdAt: -1 }
    })

    if (params.page) {
      pipeline.push({ $skip: params.page * 10 - 10 }, { $limit: 10 })
    }

    const units = await unitsCollection.aggregate(pipeline).toArray()
    const unitsTotal = await unitsCollection.countDocuments(query)
    return {
      page: units,
      total: unitsTotal
    }
  }

  async loadByIdList (unitIdList: string[]): Promise<UnitModel[]> {
    const unitsCollection = await MongoHelper.getCollection('units')
    const pipeline: object[] = []

    const unitIds = unitIdList.map(id => MongoHelper.toObjectId(id))

    pipeline.push({
      $match: { _id: { $in: unitIds } }
    })

    pipeline.push({
      $project: {
        name: '$name',
        address: '$address',
        updatedAt: '$updatedAt',
        createdAt: '$createdAt'
      }
    })

    const units = await unitsCollection.aggregate(pipeline).toArray()
    return units && MongoHelper.mapCollection(units)
  }

  async loadById (params: DeleteUnitParams): Promise<UnitModel> {
    const unitsCollection = await MongoHelper.getCollection('units')
    const unit = await unitsCollection.findOne({ _id: MongoHelper.toObjectId(params.unitId) })
    return unit && MongoHelper.map(unit)
  }

  async loadByName (params: LoadUnitByNameParams): Promise<UnitModel> {
    const unitsCollection = await MongoHelper.getCollection('units')
    const unit = await unitsCollection.findOne({ companyId: params.companyId, name: params.name })
    return unit && MongoHelper.map(unit)
  }

  async delete (params: DeleteUnitParams): Promise<void> {
    const unitsCollection = await MongoHelper.getCollection('units')
    await unitsCollection.deleteOne({ _id: MongoHelper.toObjectId(params.unitId) })
  }
}
