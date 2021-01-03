import { IAddAccountModel } from '../../usecases'
import { IAccountModel } from '../../models/IAccountModel'

export interface IAddAccounRepository {
  add: (accountData: IAddAccountModel) => Promise<IAccountModel>
}
