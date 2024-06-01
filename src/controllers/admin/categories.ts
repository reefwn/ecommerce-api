import Elysia from 'elysia'
import { CreateCategoryDto, IdDto } from '../../models'
import { categoryLib } from '../../libs'
import { ICategory } from '../../entities/categories'

export default (app: Elysia) => {
  return app.group('/categories', (category) =>
    category
      // Get categories
      .get(
        '',
        async ({ set }) => {
          const categories = await categoryLib.getCategories()

          set.status = 200
          return categories.map((category) => category.toJSON())
        }
      )
      // Get category by ID
      .get(
        '/:id',
        async ({ params, set }) => {
          const category = await categoryLib.getCategoriesById(params.id)

          set.status = 200
          return category.toJSON()
        },
        {
          params: IdDto
        }
      )
      // Create category
      .post(
        '',
        async ({ body, set }) => {
          await categoryLib.validateName(body.name)
          const newCategory = await categoryLib.saveCategory(body as ICategory)

          set.status = 201
          return newCategory.toJSON()
        },
        {
          body: CreateCategoryDto
        }
      )
      // Update category
      .put(
        '/:id',
        async ({ params, body, set }) => {
          const updatedCategory = await categoryLib.updateCategory(
            params.id,
            body as ICategory
          )

          set.status = 200
          return updatedCategory.toJSON()
        },
        {
          params: IdDto,
          body: CreateCategoryDto
        }
      )
      // Delete category
      .delete(
        '/:id',
        async ({ params, set }) => {
          await categoryLib.deleteCategory(params.id)

          set.status = 204
          return { isDeleted: true }
        },
        {
          params: IdDto
        }
      )
  )
}