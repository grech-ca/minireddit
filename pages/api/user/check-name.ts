import nc from 'next-connect';

import { UserController } from 'controllers';

const checkNameHandler = nc().get(UserController.checkName);

export default checkNameHandler;

