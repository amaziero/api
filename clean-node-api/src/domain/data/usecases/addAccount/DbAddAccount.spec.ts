import { IEncrypter } from '../../protocols/IEncrypter'
import { DbAddAccount } from './DbAddAccount'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: IEncrypter
}

const makeSut = (): SutTypes => {
  class EncrypterSutb {
    async encrypt(value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashad_passoword'))
    }
  }
  const encrypterStub = new EncrypterSutb()
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
})
