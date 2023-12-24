import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import './setup/database';
import swaggerSetup from './setup/swagger';

const app = new Elysia()
  .use(swagger(swaggerSetup))
  .get('/', () => 'Hello Elysia').listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
