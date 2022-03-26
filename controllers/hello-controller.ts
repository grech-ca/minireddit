import { NextApiHandler } from 'next';

export class HelloController {
  static hello: NextApiHandler = (req, res) => {
    res.send('Hello');
  }
}
