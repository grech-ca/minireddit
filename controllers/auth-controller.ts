import { Handler } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import { compareSync } from 'bcrypt';

import { prisma } from 'lib';

export class AuthController {
  static login: Handler = async (req, res, next) => {
    const validateUser: VerifyFunction = async (username, password, done) => {
      const [user] = await prisma.user.findMany({
        where: {
          OR: [
            { email: username },
            { name: username },
          ],
        },
        select: {
          password: true,
        },
      });

      if (!user || !user?.password) return done(null, false);
      if (!compareSync(user.password.value, password)) return done(null, false);
      return done(null, user);
    };

    passport.use(new LocalStrategy(validateUser));

    passport.authenticate('local', (error, user) => {
      if (error) {
        return res.status(400).send({ error })
      }

      if (!user) {
        return res.status(400).send({ error: 'Login failed' });
      }

      req.logIn(user, err => {
        if (err) return next(err);

        return res.send({ status: 'ok' })
      })
    })(req, res, next);

    next();
  }
}

