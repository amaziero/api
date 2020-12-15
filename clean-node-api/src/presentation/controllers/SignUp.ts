import { InvalidParamError } from '../errors/invalid-params-error'
import { ServerError } from '../errors/IServerError'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { IEmailValidador } from './protocols/IEmailValidator'
import { IhttpRequest, IhttpResponse } from './protocols/Ihttp'
import { ISignUpController } from './protocols/ISignUpController'

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

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 400,
        body: ''
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
};
