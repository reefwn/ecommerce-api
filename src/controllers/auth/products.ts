import Elysia from 'elysia'
import { productLib } from '../../libs'
import { createProductDto } from '../../models/products'

export default (app: Elysia) => {
  const tags = ['[Auth] Products']

  return app.group('/products', (product) =>
    product
      // Get product list
      .get(
        '',
        async () => {
          const product = await productLib.getProductList()

          return product
        },
        {
          detail: {
            tags
          }
        }
      ),
  )
}