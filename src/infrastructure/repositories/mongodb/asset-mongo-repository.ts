import { MongoHelper } from './mongo-helper'
import { ILoadAssetsRepository } from '@/src/usecases/boundaries/output/repositories/asset/load-assets-repository'
import { AssetModel, AssetImageModel } from '@/src/entities/asset'
import { ILoadAssetByIdRepository } from '@/src/usecases/boundaries/output/repositories/asset/load-asset-by-id-repository'
import { IAddAssetRepository, IAddAssetRepositoryParams } from '@/src/usecases/boundaries/output/repositories/asset/add-asset-repository'
import { EditAssetRepositoryParams, IEditAssetRepository } from '@/src/usecases/boundaries/output/repositories/asset/edit-asset-repository'
import { ILoadAssetByNameRepository, LoadAssetByNameParams } from '@/src/usecases/boundaries/output/repositories/asset/load-asset-by-name-repository'
import { IDeleteAssetRepository } from '@/src/usecases/boundaries/output/repositories/asset/delete-asset-repository'
import { DeleteAssetParams } from '@/src/usecases/boundaries/input/asset/delete-asset'
import { ILoadAssetsByIdListRepository } from '@/src/usecases/boundaries/output/repositories/asset/load-assets-by-id-list-repository'
import { LoadAssetsParams } from '@/src/usecases/boundaries/input/asset/load-assets'
import { PaginateDataModel } from '@/src/entities/data'
import { LoadAssetsByUnitIdParams } from '@/src/usecases/boundaries/input/asset/load-assets-by-unit-id'
import { ILoadAssetsByUnitIdRepository } from '@/src/usecases/boundaries/output/repositories/asset/load-asset-by-unit-id-repository'
import { EditAssetImageIdRepositoryParams, IEditAssetImageIdRepository } from '@/src/usecases/boundaries/output/repositories/asset/edit-asset-image-id-repository'
import { IEditAssetImageRepository, IEditAssetImageRepositoryParams } from '@/src/usecases/boundaries/output/repositories/asset/edit-asset-image-repository'
import { ILoadAssetImageByIdRepository, LoadAssetImageByIdRepositoryParams } from '@/src/usecases/boundaries/output/repositories/asset/load-asset-image-by-id-repository'

export class AssetMongoRepository implements
IAddAssetRepository,
IEditAssetImageRepository,
IEditAssetRepository,
IEditAssetImageIdRepository,
ILoadAssetsRepository,
ILoadAssetsByUnitIdRepository,
ILoadAssetsByIdListRepository,
ILoadAssetImageByIdRepository,
ILoadAssetByIdRepository,
ILoadAssetByNameRepository,
IDeleteAssetRepository {
  async add (params: IAddAssetRepositoryParams): Promise<AssetModel> {
    const assetsCollection = await MongoHelper.getCollection('assets')
    const result = await assetsCollection.insertOne({
      name: params.name,
      description: params.description,
      model: params.model,
      owner: params.owner,
      status: params.status,
      health: params.health,
      unitId: params.unitId,
      companyId: params.companyId,
      updatedAt: new Date(),
      createdAt: new Date()
    })
    return MongoHelper.map(result.ops[0])
  }

  async addImage (params: IEditAssetImageRepositoryParams): Promise<AssetImageModel> {
    const assetsCollection = await MongoHelper.getCollection('assets-images')
    const result = await assetsCollection.insertOne({
      fieldname: params.fieldname,
      originalname: params.originalname,
      encoding: params.encoding,
      mimetype: params.mimetype,
      buffer: params.buffer,
      size: params.size,
      updatedAt: new Date(),
      createdAt: new Date()
    })
    return MongoHelper.map(result.ops[0])
  }

  async edit (params: EditAssetRepositoryParams): Promise<AssetModel> {
    const assetsCollection = await MongoHelper.getCollection('assets')
    const newAsset = await assetsCollection.findOneAndUpdate({ _id: MongoHelper.toObjectId(params.assetId) }, {
      $set: {
        name: params.name,
        description: params.description,
        model: params.model,
        owner: params.owner,
        status: params.status,
        health: params.health,
        companyId: params.companyId,
        updatedAt: new Date()
      }
    }, {
      returnDocument: 'after'
    })
    return MongoHelper.map(newAsset.value)
  }

  async editImageId (params: EditAssetImageIdRepositoryParams): Promise<void> {
    const assetsCollection = await MongoHelper.getCollection('assets')
    await assetsCollection.updateOne({ _id: MongoHelper.toObjectId(params.assetId) }, {
      $set: {
        imageId: params.imageId,
        updatedAt: new Date()
      }
    })
  }

  async load (params: LoadAssetsParams): Promise<PaginateDataModel<AssetModel[]>> {
    const assetsCollection = await MongoHelper.getCollection('assets')
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
        description: '$description',
        model: '$model',
        owner: '$owner',
        status: '$status',
        health: '$health',
        imageId: '$imageId',
        unitId: '$unitId',
        companyId: '$companyId',
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

    const assets = await assetsCollection.aggregate(pipeline).toArray()
    const assetsTotal = await assetsCollection.countDocuments(query)
    return {
      page: assets,
      total: assetsTotal
    }
  }

  async loadByUnitId (params: LoadAssetsByUnitIdParams): Promise<PaginateDataModel<AssetModel[]>> {
    const assetsCollection = await MongoHelper.getCollection('assets')
    const pipeline: object[] = []

    const query = params.filter !== undefined ? { companyId: params.companyId, unitId: params.unitId, name: { $regex: params.filter, $options: 'i' } } : { companyId: params.companyId, unitId: params.unitId }

    pipeline.push({
      $match: query
    })

    pipeline.push({
      $project: {
        _id: false,
        id: '$_id',
        name: '$name',
        description: '$description',
        model: '$model',
        owner: '$owner',
        status: '$status',
        health: '$health',
        imageId: '$imageId',
        unitId: '$unitId',
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

    const assets = await assetsCollection.aggregate(pipeline).toArray()
    const assetsTotal = await assetsCollection.countDocuments(query)
    return {
      page: assets,
      total: assetsTotal
    }
  }

  async loadImage (params: LoadAssetImageByIdRepositoryParams): Promise<AssetImageModel> {
    const assetsImagesCollection = await MongoHelper.getCollection('assets-images')
    const image = await assetsImagesCollection.findOne({ _id: MongoHelper.toObjectId(params.imageId) })
    return image && MongoHelper.map(image)
  }

  async loadByIdList (assetIdList: string[]): Promise<AssetModel[]> {
    const assetsCollection = await MongoHelper.getCollection('assets')
    const pipeline: object[] = []

    const assetIds = assetIdList.map(id => MongoHelper.toObjectId(id))

    pipeline.push({
      $match: { _id: { $in: assetIds } }
    })

    pipeline.push({
      $project: {
        name: '$name',
        address: '$address',
        updatedAt: '$updatedAt',
        createdAt: '$createdAt'
      }
    })

    const assets = await assetsCollection.aggregate(pipeline).toArray()
    return assets && MongoHelper.mapCollection(assets)
  }

  async loadById (params: DeleteAssetParams): Promise<AssetModel> {
    const assetsCollection = await MongoHelper.getCollection('assets')
    const asset = await assetsCollection.findOne({ _id: MongoHelper.toObjectId(params.assetId) })
    return asset && MongoHelper.map(asset)
  }

  async loadByName (params: LoadAssetByNameParams): Promise<AssetModel> {
    const assetsCollection = await MongoHelper.getCollection('assets')
    const asset = await assetsCollection.findOne({ companyId: params.companyId, name: params.name })
    return asset && MongoHelper.map(asset)
  }

  async delete (params: DeleteAssetParams): Promise<void> {
    const assetsCollection = await MongoHelper.getCollection('assets')
    await assetsCollection.deleteOne({ _id: MongoHelper.toObjectId(params.assetId) })
  }
}
