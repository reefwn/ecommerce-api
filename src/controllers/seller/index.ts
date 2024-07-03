import Elysia from 'elysia'
import productsController from './products'

export default (app: Elysia) => {
  return app.group('/seller', (seller) => {
    return seller
      .use(productsController)
  })
}