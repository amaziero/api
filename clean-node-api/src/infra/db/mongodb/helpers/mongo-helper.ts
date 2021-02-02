import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(url: string): Promise<void> {
    const MONGO_URL_CHECKED = process.env.MONGO_URL

    if (!MONGO_URL_CHECKED) {
      throw Error('Mongo URL Error')
    }

    this.client = await MongoClient.connect(MONGO_URL_CHECKED, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect() {
    await this.client.close()
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  }
}
