import Elysia from "elysia"
import { CreateCategoryDto } from "../models/categories"
import { categoryLib } from "../libs"
import { ICategory } from "../entities/categories"
import { mapError } from "../libs/error"

export const categoriesController = (app: Elysia) => {
  return app.group('/categories', (category) =>
    category
      .post(
        '',
        async ({ body, set }) => {
          try {
            await categoryLib.validateName(body.name)
            const newCategory = await categoryLib.saveCategory(body as ICategory)

            set.status = 201
            return newCategory.toJSON()
          } catch (err: any) {
            const { message, status } = mapError('createCategories', err)

            set.status = status
            return { error: message }
          }
        },
        {
          body: CreateCategoryDto
        }
      )
  )
}