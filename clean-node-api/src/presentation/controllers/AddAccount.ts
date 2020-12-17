import { IAccountModel } from '../../domain/models/IAccountModel'
import { IAddAccount, IAddAccountModel } from '../../domain/usecases'

export class AddAccount implements IAddAccount {
  private readonly account: IAddAccount

  constructor(account: IAddAccount) {
    this.account = account
  }

  add(account: IAddAccountModel): IAccountModel { }
}
