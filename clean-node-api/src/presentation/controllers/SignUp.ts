import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helper'
import { IhttpRequest, IhttpResponse } from './protocols/Ihttp'

export class SignUpController {
  handle(httpRequest: IhttpRequest): IhttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    return {
      statusCode: 400,
      body: ''
    }
  }
};
