import { IEncrypter } from './DbAddAccountProtocols'
import { DbAddAccount } from './DbAddAccount'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: IEncrypter
}

const makeEncrypter = (): IEncrypter => {
  class EncrypterSutb implements IEncrypter {
    async encrypt(value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashad_passoword'))
    }
  }

  return new EncrypterSutb()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
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
})
