import bcrypt from 'bcrypt'
import { BcryptAdapter } from './BcryptAdapter'

const makeSut = (): any => {
  const salt = 12

  const sut = new BcryptAdapter(salt)
  return { sut, salt }
}

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

describe('BcryptAdapter', () => {
  test('should call bcrypt with correct value', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('should return hashed value on sucess', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('hash')

    expect(hash).toBe('hash')
  })
})
