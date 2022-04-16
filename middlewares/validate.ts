import { Handler } from 'express';
import { object } from 'yup';
import { pick } from 'lodash';

import { ValidationShape } from 'validation/types';

export interface ValidateMiddlewareParam {
  query?: ValidationShape;
  body?: ValidationShape;
}

export interface ValidateMiddleware {
  (shape: ValidateMiddlewareParam): Handler;
}

export const validate: ValidateMiddleware = ({ query = {}, body = {} }) => async (req, res, next) => {
  const schema = object({
    query: object(query).nullable(),
    body: object(body).nullable(),
  });

  try {
    const values = pick(req, 'body', 'query');
    await schema.validate(values, { abortEarly: false });
  } catch (error) {
    res.status(400).send(error);
  } finally {
    next();
  }
};

