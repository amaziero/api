import {
  IAddAccount,
  IAddAccountModel,
  IAccountModel,
  IEncrypter
} from './DbAddAccountProtocols'

export class DbAddAccount implements IAddAccount {
  private readonly encrypter

  constructor(encrypter: IEncrypter) {
    this.encrypter = encrypter
  }

  async add(account: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)

    return hashedPassword
  }
}
