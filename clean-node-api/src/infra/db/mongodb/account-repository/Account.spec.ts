import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    const MONGO_URL_CHECKED = process.env.MONGO_URL
    if (!MONGO_URL_CHECKED) {
      throw Error('Mongo URL Error')
    }

    await MongoHelper.connect(MONGO_URL_CHECKED)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should Return an account on success', async () => {
    const sut = makeSut()

    const account = await sut.add({
      name: 'john_doe',
      email: 'john_doe@any.com',
      password: 'john_doe'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('john_doe')
    expect(account.email).toBe('john_doe@any.com')
    expect(account.password).toBe('john_doe')
  })
})
