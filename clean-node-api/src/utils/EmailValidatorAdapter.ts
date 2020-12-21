import { IEmailValidador } from '../presentation/controllers/protocols/IEmailValidator'

export class EmailValidatorAdapter implements IEmailValidador {
  isValid(email: string): boolean {
    return false
  };
}
