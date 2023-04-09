
import { UserModel } from '@/src/entities/user'
import { AddUserRepositoryParams, IAddUserRepository } from '@/src/usecases/boundaries/output/repositories/user/add-user-repository'
import { ILoadUserByEmailRepository } from '@/src/usecases/boundaries/output/repositories/user/load-user-by-email-repository'
import { ILoadUserByIdRepository, LoadUserByIdRepositortyParams } from '@/src/usecases/boundaries/output/repositories/user/load-user-by-id-repository'
import { ILoadUserByTokenRepository } from '@/src/usecases/boundaries/output/repositories/user/load-user-by-token-repository'
import { IUpdateAccessTokenRepository } from '@/src/usecases/boundaries/output/repositories/user/update-access-token-repository'
import { MongoHelper } from './mongo-helper'
import { EditUserRepositoryParams, IEditUserRepository } from '@/src/usecases/boundaries/output/repositories/user/edit-user-repository'
import { IDeleteUserRepository } from '@/src/usecases/boundaries/output/repositories/user/delete-user-repository'
import { DeleteUserParams } from '@/src/usecases/boundaries/input/user/delete-user'
import { ILoadUsersRepository } from '@/src/usecases/boundaries/output/repositories/user/load-users-repository'
import { LoadUsersParams } from '@/src/usecases/boundaries/input/user/load-users'
import { PaginateDataModel } from '@/src/entities/data'
import { ILoadUserByNameRepository, LoadUserByNameRepositoryParams } from '@/src/usecases/boundaries/output/repositories/user/load-user-by-name-repository'

export class UserMongoRepository implements
IAddUserRepository,
IEditUserRepository,
IDeleteUserRepository,
ILoadUsersRepository,
ILoadUserByIdRepository,
ILoadUserByNameRepository,
ILoadUserByEmailRepository,
IUpdateAccessTokenRepository,
ILoadUserByTokenRepository {
  async add (params: AddUserRepositoryParams): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne({
      name: params.name,
      email: params.email,
      password: params.password,
      role: params.role,
      companyId: params.companyId,
      updatedAt: new Date(),
      createdAt: new Date()
    })
    const { accessToken, password, ...userWithoutTokenAndPassword } = result.ops[0]
    return MongoHelper.map(userWithoutTokenAndPassword)
  }

  async edit (params: EditUserRepositoryParams): Promise<UserModel> {
    const usersCollection = await MongoHelper.getCollection('users')
    const newUser = await usersCollection.findOneAndUpdate({ _id: MongoHelper.toObjectId(params.userId) }, {
      $set: {
        name: params.name,
        email: params.email,
        role: params.role,
        updatedAt: new Date()
      }
    }, {
      returnDocument: 'after'
    })
    if (!newUser.value) {
      return null
    }
    const { accessToken, password, ...userWithoutTokenAndPassword } = newUser.value
    return MongoHelper.map(userWithoutTokenAndPassword)
  }

  async load (params: LoadUsersParams): Promise<PaginateDataModel<UserModel[]>> {
    const usersCollection = await MongoHelper.getCollection('users')
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
        email: '$email',
        role: '$role',
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

    const users = await usersCollection.aggregate(pipeline).toArray()
    const usersTotal = await usersCollection.countDocuments(query)
    return {
      page: users,
      total: usersTotal
    }
  }

  async loadById (params: LoadUserByIdRepositortyParams): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ _id: MongoHelper.toObjectId(params.userId) })
    return user && MongoHelper.map(user)
  }

  async loadByName (params: LoadUserByNameRepositoryParams): Promise<UserModel> {
    const usersCollection = await MongoHelper.getCollection('users')
    const user = await usersCollection.findOne({ companyId: params.companyId, name: params.name })
    return user && MongoHelper.map(user)
  }

  async loadByEmail (email: string): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ email })
    return user && MongoHelper.map(user)
  }

  async loadByToken (token: string, role?: string): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]

    })
    return user && MongoHelper.map(user)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.updateOne({ _id: MongoHelper.toObjectId(id) }, { $set: { accessToken: token } })
  }

  async delete (params: DeleteUserParams): Promise<void> {
    const usersCollection = await MongoHelper.getCollection('users')
    await usersCollection.deleteOne({ _id: MongoHelper.toObjectId(params.userId) })
  }
}
