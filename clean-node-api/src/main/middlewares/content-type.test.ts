import request from 'supertest'
import app from '../config/app'

describe('Content Type Middlewere', () => {
  test('Should return default content type as JSON', async () => {
    app.get('/test_content_type', (request, response) => {
      response.send()
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  test('Should return xml content type when foreced', async () => {
    app.get('/test_content_type_xml', (request, response) => {
      response.type('xml')
      response.send()
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
