import { IEmailValidador } from '../presentation/controllers/protocols/IEmailValidator'
import validator from 'validator'

export class EmailValidatorAdapter implements IEmailValidador {
  isValid(email: string): boolean {
    return validator.isEmail(email)
  };
}
