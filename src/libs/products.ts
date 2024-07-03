import { error } from 'elysia'
import Category, { IAttribute } from '../entities/categories'
import { ISpecification } from '../entities/products'
import { IAttributeMap } from '../types/products'
import { CreateProductDto } from '../models'
import { Product } from '../entities'

const findCategoryAttributes = async (categoryName: string) => {
  const category = await Category.findOne({ name: categoryName }).exec()
  if (!category) throw error(400, 'INVALID_CATEGORY')

  return category?.attributes ?? []
}

const createAttributeMap = (attributes: IAttribute[]): IAttributeMap => {
  return attributes.reduce((map, attribute) => {
    map[attribute.name] = attribute
    return map
  }, {} as IAttributeMap)
}

const validateSpecificationTypes = (specifications: ISpecification[], attributeMap: IAttributeMap) => {
  for (let spec of specifications) {
    const attribute = attributeMap[spec.name]
    if (!attribute) {
      throw error(400, `INVALID_ATTRIBUTE: ${spec.name}`)
    }

    const attributeType = attribute.type.toLowerCase()
    if (typeof spec.value !== attributeType) {
      throw error(400, `INVALID_TYPE_FOR_ATTRIBUTE:${spec.name}.EXPECTED:${attributeType},GOT:${typeof spec.value}`)
    }
  }
}

export const validateRequiredAttributes = (categoryAttributes: IAttribute[], specifications: ISpecification[]) => {
  for (let attribute of categoryAttributes) {
    if (attribute.required && !specifications.find(spec => spec.name === attribute.name)) {
      throw error(400, `MISSING_REQUIRED_ATTRIBUTE:${attribute.name}`)
    }
  }
}

export const validateProductSpecifications = async (
  categoryName: string,
  specifications: ISpecification[]
): Promise<void> => {
  const categoryAttributes = await findCategoryAttributes(categoryName)
  const attributeMap = createAttributeMap(categoryAttributes)

  validateSpecificationTypes(specifications, attributeMap)
  validateRequiredAttributes(categoryAttributes, specifications)
}

export const saveProduct = async (product: CreateProductDto) => {
  const newProduct = new Product()
  newProduct.name = product.name
  newProduct.category = product.category
  newProduct.price = product.price
  newProduct.description = product.description
  newProduct.specifications = product.specifications

  await newProduct.save()

  return newProduct.toJSON()
}

export const getProductList = async () => {
  const products = await Product.find().exec()
  return products.map(product => product.toJSON())
}