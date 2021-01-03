import { IAccountModel } from '../../domain/models/IAccountModel'
import { IAddAccountModel } from '../../domain/usecases'

export interface IAddAccounRepository {
  add: (accountData: IAddAccountModel) => Promise<IAccountModel>
}
