import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { IhttpRequest, IhttpResponse } from './protocols/Ihttp'

export class SignUpController {
  handle(httpRequest: IhttpRequest): IhttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 400,
      body: ''
    }
  }
};
