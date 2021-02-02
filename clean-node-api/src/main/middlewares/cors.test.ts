import request from 'supertest'
import app from '../config/app'

describe('Cors middleware', () => {
  test('Should eneble CORS', async () => {
    app.post('/test_cors', (request, response) => {
      response.send()
    })

    await request(app)
      .post('/test_cors')
      .expect('access-control-allow-orrigin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
