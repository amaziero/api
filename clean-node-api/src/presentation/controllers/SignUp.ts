import { IAddAccount } from '../../domain/usecases'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { IhttpRequest, IhttpResponse, IEmailValidador, ISignUpController } from './protocols'

export class SignUpController implements ISignUpController {
  private readonly emailValidator: IEmailValidador
  private readonly addAccount: IAddAccount

  constructor(emailValidator: IEmailValidador, addAccount: IAddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle(httpRequest: IhttpRequest): IhttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest?.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })

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
