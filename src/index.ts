import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import './setup/database';

import swaggerSetup from './setup/swagger';
import { categoriesController } from './controllers/categories';

const app = new Elysia()
  .use(swagger(swaggerSetup))
  .group('/api', (api) => api
    .use(categoriesController)
  )
  .get('/', () => 'Hello Elysia')
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
