import { IhttpResponse } from '../controllers/protocols/Ihttp'

export const badRequest = (error: Error): IhttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
