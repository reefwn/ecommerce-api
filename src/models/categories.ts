import { t } from "elysia";

export const CreateCategoryDto = t.Object({
  name: t.String(),
  attributes: t.Array(t.Object({
    name: t.String(),
    type: t.String(),
    required: t.Boolean()
  }))
})