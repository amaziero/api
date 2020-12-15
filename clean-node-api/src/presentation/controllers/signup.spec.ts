import { MissingParamError } from '../errors/missing-params-error'
import { SignUpController } from './SignUp'

describe('SignUp Controller', () => {
  test('should return 400 if no name is provided', () => {
    // sut stands for 'Sistem Under Test', tha means for the class wich is
    // been tested at the moment

    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if no email is provided', () => {
    // sut stands for 'Sistem Under Test', tha means for the class wich is
    // been tested at the moment

    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
