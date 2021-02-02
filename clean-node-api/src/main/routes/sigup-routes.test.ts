import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Signup roots', () => {
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

  test('Should retun an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Alison Maziero',
        email: 'alison_lens@hotmail.com',
        password: 'teste',
        passwordConfirmation: 'teste'
      })
      .expect(200)
  })
})
