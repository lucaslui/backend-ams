import { MongoClient, Collection, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  toObjectId: (data: any): ObjectId => {
    return new ObjectId(data)
  },

  map: (data: any): any => {
    const { _id, ...rest } = data
    const id = _id?.toString()
    return { id, ...rest }
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}
