import nc from 'next-connect';

import { HelloController } from 'controllers';

const helloHandler = nc()
  .get('hello', HelloController.hello);

export default helloHandler;

