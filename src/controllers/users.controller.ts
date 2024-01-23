import { Elysia, t } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { toUserEntity } from '../libs/users';
import { jwtExp, jwtSecret } from '../setup/config';
import { mapError } from '../libs/mongo';
import { loadTemplate, sendEmail } from '../libs/email';

export const usersController = (app: Elysia) => {
  return app.group('/users', (user) =>
    user.use(
      jwt({
        name: 'jwt',
        secret: jwtSecret,
        exp: jwtExp,
      })
    )
      // register
      .post(
        '',
        async ({ jwt, body, set }) => {
          try {
            const newUser = await toUserEntity(body);
            const savedUser = await newUser.save();

            const accessToken = await jwt.sign({ userId: savedUser._id });

            const template = loadTemplate('confirm-registration.hbs', {});
            await sendEmail(savedUser.email, 'Confirm Your Email!', template)

            set.headers = { authorization: accessToken };
            set.status = 201;
            return { _id: savedUser.id };
          } catch (err: any) {
            const response = mapError(err);

            set.status = response.status;
            return response;
          }
        },
        {
          body: t.Object({
            email: t.String(),
            password: t.String(),
          }),
        }
      )
  )
}