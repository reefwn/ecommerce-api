import { error } from 'elysia'
import { Category } from '../entities'
import { ICategory } from '../entities/categories'

const Error = {
  NOT_FOUND: 'CATEGORY_NOT_FOUND',
  ALREADY_EXISTS: 'CATEGORY_ALREADY_EXISTS'
}

export const getCategories = async () => {
  return Category.find().exec()
}

export const getCategoriesById = async (id: string) => {
  const category = await Category.findById(id).exec()

  if (!category) throw error(404, Error.NOT_FOUND)

  return category
}

export const validateName = async (name: string) => {
  const category = await Category.findOne({ name }).exec()
  if (category) throw error(409, Error.ALREADY_EXISTS)
}

export const saveCategory = async (category: ICategory) => {
  const newCategory = new Category()
  newCategory.name = category.name
  newCategory.attributes = category.attributes

  await newCategory.save()

  return newCategory
}

export const updateCategory = async (id: string, category: ICategory) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    category,
    { new: true, runValidators: true }
  ).exec()

  if (!updatedCategory) throw error(404, Error.NOT_FOUND)

  return updatedCategory
}

export const deleteCategory = async (id: string) => {
  const deletedCategory = await Category.findByIdAndDelete(id).exec()

  if (!deletedCategory) throw error(404, Error.NOT_FOUND)
}