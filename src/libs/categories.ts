import { Category } from "../entities"
import { ICategory } from "../entities/categories"

export const validateName = async (name: string) => {
  const category = await Category.findOne({ name }).exec()
  if (category) throw new Error("CATEGORY_ALREADY_EXISTS")
}

export const saveCategory = async (category: ICategory) => {
  const newCategory = new Category()
  newCategory.name = category.name
  newCategory.attributes = category.attributes

  await newCategory.save()

  return newCategory
}