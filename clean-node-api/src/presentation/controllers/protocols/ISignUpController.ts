import { IhttpRequest, IhttpResponse } from './Ihttp'

export interface ISignUpController {
  handle: (httpRequest: IhttpRequest) => IhttpResponse
}
