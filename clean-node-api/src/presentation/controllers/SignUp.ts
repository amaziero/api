import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { IhttpRequest, IhttpResponse, IEmailValidador, ISignUpController } from './protocols'

export class SignUpController implements ISignUpController {
  private readonly emailValidator: IEmailValidador
  constructor(emailValidator: IEmailValidador) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: IhttpRequest): IhttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const [email, password, passwordConfirmation] = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 400,
        body: ''
      }
    } catch (err) {
      console.log(err)
      return serverError()
    }
  }
};
