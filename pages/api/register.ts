import nc from 'next-connect';
import * as yup from 'yup';

import { UserController } from 'controllers';
import { validate } from 'middlewares';
import { registrationSchema } from 'validation/server';

const registerHandler = nc()
  .use(
    '/',
    validate({
      body: registrationSchema,
    }),
  )
  .post(UserController.register);

export default registerHandler;

