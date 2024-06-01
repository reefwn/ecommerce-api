import { Static, t } from 'elysia';

export const createProductDto = t.Object({
  name: t.String(),
  category: t.String(),
  price: t.Number(),
  description: t.String(),
  specifications: t.Array(t.Object({
    name: t.String(),
    value: t.Any()
  }))
})

export type CreateProductDto = Static<typeof createProductDto>