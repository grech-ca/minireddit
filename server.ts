import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import * as yup from 'yup';

import { AuthController, UserController } from 'controllers';
import { authRouter } from 'lib/auth';
import { prisma } from 'lib';
import { session, validate } from 'middlewares';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const PORT = 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  server.use(bodyParser.json());
  server.use(session);

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user as any));

  server.use(passport.initialize());
  server.use(passport.session());

  server.use('/auth', authRouter);

  server.get('/', (req, res, next) => {
    if(!req.isAuthenticated()) return res.redirect('/login')
    next();
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.info(`> Ready on http://localhost:${3000}`);
  });
}).finally(() => {
  prisma.$disconnect();
});
