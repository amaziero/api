import { IhttpResponse } from '../controllers/protocols/Ihttp'
import { ServerError } from '../errors'

export const badRequest = (error: Error): IhttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (): IhttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}

export const ok = (data: any): IhttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}
