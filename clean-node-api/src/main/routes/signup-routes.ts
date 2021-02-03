import { Router } from 'express'
import { makeSingUpController } from '../factories/signup'
import { adapterRouter } from '../addapters/express-routes-addapter'

export default (router: Router): void => {
  router.post('/signup', adapterRouter(makeSingUpController()))
}
