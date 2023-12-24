import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { usersController } from './controllers/users.controller';

import './setup/database';
import swaggerSetup from './setup/swagger';

const app = new Elysia()
  .use(swagger(swaggerSetup))
  .group('/api', (api) => api.use(usersController))
  .get('/', () => 'Hello Elysia')
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
