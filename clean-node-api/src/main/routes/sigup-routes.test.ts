import request from 'supertest'
import app from '../config/app'

describe('Signup roots', () => {
  test('Should retun an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Alison Maziero',
        email: 'alison_lens@hotmail.com',
        password: 'teste',
        passwordConfirmation: 'teste'
      })
      .expect(200)
  })
})
