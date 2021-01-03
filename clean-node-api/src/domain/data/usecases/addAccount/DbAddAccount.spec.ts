import {
  IEncrypter,
  IAddAccountModel,
  IAccountModel,
  IAddAccounRepository
} from './DbAddAccountProtocols'
import { DbAddAccount } from './DbAddAccount'

const makeAddAccountRepositoryStub = (): IAddAccounRepository => {
  class AddAccountRepositoryStub implements IAddAccounRepository {
    async add(accountData: IAddAccountModel): Promise<IAccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'validName',
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      }
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountRepositoryStub()
}

const makeEncrypter = (): IEncrypter => {
  class EncrypterSutb implements IEncrypter {
    async encrypt(value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterSutb()
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: IEncrypter
  addAccountRepositoryStub: IAddAccounRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'validName',
      email: 'valid_email@mail.com',
      password: 'validpassword'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('validpassword')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()

    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const accountData = {
      name: 'validName',
      email: 'valid_email@mail.com',
      password: 'validpassword'
    }

    const promiseAccount = sut.add(accountData)
    await expect(promiseAccount).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'validName',
      email: 'valid_email@mail.com',
      password: 'validpassword'
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith(
      {
        name: 'validName',
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      }
    )
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const accountData = {
      name: 'validName',
      email: 'valid_email@mail.com',
      password: 'validpassword'
    }

    const promiseAccount = sut.add(accountData)
    await expect(promiseAccount).rejects.toThrow()
  })

  test('Should return an account on sucess', async () => {
    const { sut } = makeSut()

    const accountData = {
      name: 'validName',
      email: 'valid_email@mail.com',
      password: 'validpassword'
    }
    const account = await sut.add(accountData)
    expect(account).toEqual(
      {
        id: 'valid_id',
        name: 'validName',
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      }
    )
  })
})
