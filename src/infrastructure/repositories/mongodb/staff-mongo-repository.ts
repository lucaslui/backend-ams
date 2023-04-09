
import { StaffModel } from '@/src/entities/staff'
import { IAddStaffRepository, AddStaffRepositoryParams } from '@/src/usecases/boundaries/output/repositories/staff/add-staff-repository'
import { ILoadStaffByEmailRepository } from '@/src/usecases/boundaries/output/repositories/staff/load-staff-by-email-repository'
import { ILoadStaffByIdRepository, LoadStaffByIdParams } from '@/src/usecases/boundaries/output/repositories/staff/load-staff-by-id-repository'
import { ILoadStaffByTokenRepository } from '@/src/usecases/boundaries/output/repositories/staff/load-staff-by-token-repository'
import { IUpdateAccessTokenRepository } from '@/src/usecases/boundaries/output/repositories/user/update-access-token-repository'
import { MongoHelper } from './mongo-helper'
import { IDeleteStaffRepository } from '@/src/usecases/boundaries/output/repositories/staff/delete-staff-repository'
import { EditStaffRepositoryParams, IEditStaffRepository } from '@/src/usecases/boundaries/output/repositories/staff/edit-staff-repository'
import { ILoadStaffByNameRepository, LoadStaffByNameParams } from '@/src/usecases/boundaries/output/repositories/staff/load-staff-by-name-repository'
import { ILoadStaffsRepository } from '@/src/usecases/boundaries/output/repositories/staff/load-staffs-repository'
import { DeleteStaffParams } from '@/src/usecases/boundaries/input/staff/delete-staff'
import { PaginateDataModel } from '@/src/entities/data'
import { LoadStaffsParams } from '@/src/usecases/boundaries/input/staff/load-staffs'

export class StaffMongoRepository implements
IAddStaffRepository,
IEditStaffRepository,
IDeleteStaffRepository,
ILoadStaffsRepository,
ILoadStaffByNameRepository,
ILoadStaffByIdRepository,
ILoadStaffByEmailRepository,
IUpdateAccessTokenRepository,
ILoadStaffByTokenRepository {
  async add (params: AddStaffRepositoryParams): Promise<StaffModel> {
    const staffCollection = await MongoHelper.getCollection('staffs')
    const result = await staffCollection.insertOne({
      name: params.name,
      email: params.email,
      updatedAt: new Date(),
      createdAt: new Date()
    })
    const { accessToken, password, ...staffWithoutTokenAndPassword } = result.ops[0]
    return MongoHelper.map(staffWithoutTokenAndPassword)
  }

  async edit (params: EditStaffRepositoryParams): Promise<StaffModel> {
    const staffsCollection = await MongoHelper.getCollection('staffs')
    const newStaff = await staffsCollection.findOneAndUpdate({ _id: MongoHelper.toObjectId(params.staffId) }, {
      $set: {
        name: params.name,
        email: params.email,
        updatedAt: new Date()
      }
    }, {
      returnDocument: 'after'
    })
    const { accessToken, password, ...staffWithoutTokenAndPassword } = newStaff.value
    return MongoHelper.map(staffWithoutTokenAndPassword)
  }

  async load (params: LoadStaffsParams): Promise<PaginateDataModel<StaffModel[]>> {
    const staffsCollection = await MongoHelper.getCollection('staffs')
    const pipeline: object[] = []

    const query = params.filter !== undefined ? { name: { $regex: params.filter, $options: 'i' } } : {}

    pipeline.push({
      $match: query
    })

    pipeline.push({
      $project: {
        _id: false,
        id: '$_id',
        name: '$name',
        email: '$email',
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

    const staffs = await staffsCollection.aggregate(pipeline).toArray()
    const staffsTotal = await staffsCollection.countDocuments(query)
    return {
      page: staffs,
      total: staffsTotal
    }
  }

  async loadById (params: LoadStaffByIdParams): Promise<StaffModel> {
    const staffCollection = await MongoHelper.getCollection('staffs')
    const staff = await staffCollection.findOne({ _id: MongoHelper.toObjectId(params.staffId) })
    return staff && MongoHelper.map(staff)
  }

  async loadByName (params: LoadStaffByNameParams): Promise<StaffModel> {
    const staffsCollection = await MongoHelper.getCollection('staffs')
    const unit = await staffsCollection.findOne({ name: params.name })
    return unit && MongoHelper.map(unit)
  }

  async loadByEmail (email: string): Promise<StaffModel> {
    const staffCollection = await MongoHelper.getCollection('staffs')
    const staff = await staffCollection.findOne({ email })
    return staff && MongoHelper.map(staff)
  }

  async loadByToken (token: string, role?: string): Promise<StaffModel> {
    const staffCollection = await MongoHelper.getCollection('staffs')
    const staff = await staffCollection.findOne({
      accessToken: token
    })
    return staff && MongoHelper.map(staff)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const staffCollection = await MongoHelper.getCollection('staffs')
    await staffCollection.updateOne({ _id: MongoHelper.toObjectId(id) }, { $set: { accessToken: token } })
  }

  async delete (params: DeleteStaffParams): Promise<void> {
    const staffsCollection = await MongoHelper.getCollection('staffs')
    await staffsCollection.deleteOne({ _id: MongoHelper.toObjectId(params.staffId) })
  }
}
