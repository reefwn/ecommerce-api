import Elysia, { t } from "elysia"
import { CreateCategoryDto, IdDto } from "../models"
import { categoryLib } from "../libs"
import { ICategory } from "../entities/categories"
import { mapError } from "../libs/error"

export const categoriesController = (app: Elysia) => {
  return app.group('/categories', (category) =>
    category
      // Create category
      .post(
        '',
        async ({ body, set }) => {
          try {
            await categoryLib.validateName(body.name)
            const newCategory = await categoryLib.saveCategory(body as ICategory)

            set.status = 201
            return newCategory.toJSON()
          } catch (err: any) {
            const { message, status } = mapError('createCategory', err)

            set.status = status
            return { error: message }
          }
        },
        {
          body: CreateCategoryDto
        }
      )
      // Update category
      .put(
        '/:id',
        async ({ params, body, set }) => {
          try {
            const updatedCategory = await categoryLib.updateCategory(
              params.id,
              body as ICategory
            )

            set.status = 200
            return updatedCategory.toJSON()
          } catch (err: any) {
            const { message, status } = mapError('updateCategory', err)

            set.status = status
            return { error: message }
          }
        },
        {
          params: IdDto,
          body: CreateCategoryDto
        }
      )
  )
}