import Elysia from 'elysia'
import productsController from './products'

export default (app: Elysia) => {
  return app.group('/auth', (auth) => {
    return auth
      .use(productsController)
  })
}