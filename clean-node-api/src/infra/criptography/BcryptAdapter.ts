import { IEncrypter } from '../../data/protocols/IEncrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IEncrypter {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = salt
  }

  async encrypt(value: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(value, 12)

    return hashedPassword
  }
}
