import Elysia from 'elysia'
import { productLib } from '../../libs'
import { createProductDto } from '../../models/products'

export default (app: Elysia) => {
  const tags = ['[Auth] Products']

  return app.group('/products', (product) =>
    product
      // Create product
      .post(
        '',
        async ({ body, set }) => {
          const { category, specifications } = body

          await productLib.validateProductSpecifications(
            category,
            specifications
          )

          const product = await productLib.saveProduct(body)

          set.status = 201
          return product
        },
        {
          body: createProductDto,
          detail: {
            tags
          }
        }
      ),
  )
}