import { MissingParamError } from '../errors/missing-params-error'
import { IhttpRequest, IhttpResponse } from './protocols/Ihttp'

export class SignUpController {
  handle(httpRequest: IhttpRequest): IhttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }

    return {
      statusCode: 400,
      body: ''
    }
  }
};
