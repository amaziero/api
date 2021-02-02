import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoots from './routs'

const app = express()

setupMiddlewares(app)
setupRoots(app)

export default app
