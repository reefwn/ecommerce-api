import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'

import './setup/database'

import swaggerSetup from './setup/swagger'
import adminController from './controllers/admin'
import authController from './controllers/auth'
import sellerController from './controllers/seller'

const app = new Elysia()
  .use(swagger(swaggerSetup))
  .group('/api', (api) => api
    .use(adminController)
    .use(authController)
    .use(sellerController)
  )
  .get('/', () => 'Hello Elysia')
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
