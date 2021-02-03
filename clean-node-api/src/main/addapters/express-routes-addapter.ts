import { ISignUpController, IhttpRequest } from '../../presentation/controllers/protocols'
import { Request, Response } from 'express'

export const adapterRouter = (constroller: ISignUpController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: IhttpRequest = {
      body: request.body
    }
    const httpResponse = await constroller.handle(httpRequest)

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
