import nc from 'next-connect';
import * as yup from 'yup';

import { UserController } from 'controllers';
import { validate } from 'middlewares';

const checkEmailHandler = nc()
  .use(
    '/',
    validate({
      query: {
        email: yup
          .string()
          .email()
          .required(),
      },
    }),
  )
  .get(UserController.checkEmail);

export default checkEmailHandler;

