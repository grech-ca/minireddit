import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import { compareSync } from 'bcrypt';

import { prisma } from 'lib';

export const authRouter = express.Router();

const validateUser: VerifyFunction = async (nameOrEmail, password, done) => {
  console.log('Validate user');
  const [user] = await prisma.user.findMany({
    where: {
      OR: [
        { name: nameOrEmail },
        { email: nameOrEmail },
      ],
    },
    select: { password: true }
  });

  if (!user?.password) return done(null, false);
  if (!compareSync(password, user.password.value)) return done(null, false);

  return done(null, user);
};

passport.use(new LocalStrategy(validateUser));

authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) res.status(400).send({ error: err });

    if (!user) res.status(400).send({ error: 'Login failed' });

    req.logIn(user, err => {
      if (err) return next(err);

      return res.send({ status: 'ok' });
    });
  })(req, res, next);
});

authRouter.post('/logout', (req, res, next) => {
  req.logout();
  res.send('ok');
});

