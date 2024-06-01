import Elysia from 'elysia'
import categoriesController from './categories'

export default (app: Elysia) => {
  return app.group('/admin', (admin) => {
    return admin
      .use(categoriesController)
  })
}