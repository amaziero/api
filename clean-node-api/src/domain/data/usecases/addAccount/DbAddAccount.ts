import { IAddAccounRepository } from '../../protocols/IAddAccounRepository'
import {
  IAddAccount,
  IAddAccountModel,
  IAccountModel,
  IEncrypter
} from './DbAddAccountProtocols'

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter
  private readonly addAccountRepository: IAddAccounRepository

  constructor(
    encrypter: IEncrypter,
    addAccountRepository: IAddAccounRepository
  ) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign(
      {}, accountData, { password: hashedPassword }
    ))

    return account
  }
}
