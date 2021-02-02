import { IAddAccounRepository } from '../../../../data/protocols/IAddAccounRepository'
import { IAccountModel } from '../../../../domain/models/IAccountModel'
import { IAddAccountModel } from '../../../../domain/usecases'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements IAddAccounRepository {
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')

    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]
    const { _id, ...accountWithoutId } = account

    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
