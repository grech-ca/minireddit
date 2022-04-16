import { Handler } from 'express';
import { NextApiHandler } from 'next';

import { UserService } from 'services';

export class UserController {
  static checkName: NextApiHandler = async (req, res) => {
    const { name } = req.query;
    const isNameAvailable = !(await UserService.isNameTaken(Array.isArray(name) ? name[0] : name));

    res.send(isNameAvailable);
  }

  static checkEmail: NextApiHandler = async (req, res) => {
    const { email } = req.query;
    const isEmailAvailable = !(await UserService.isEmailTaken(Array.isArray(email) ? email[0] : email));

    res.send(isEmailAvailable);
  }

  static register: NextApiHandler = async (req, res) => {
    const user = await UserService.register(req.body);
    res.send(user);
  }

  static me: Handler = async (req, res) => {
    console.log(req.isAuthenticated());
    res.send({ isAuthenticated: req.isAuthenticated() });
  }
}

