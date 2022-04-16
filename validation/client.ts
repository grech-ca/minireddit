import * as yup from 'yup';
import axios from 'axios';
import qc from 'query-string';
import { negate, isEmpty } from 'lodash';

import { ValidationMessage } from 'validation/message';
import {
  nameRegex,
  hasCapitalRegex,
  hasDigitRegex,
  hasSpecialRegex,
} from 'validation/regex';

export const registrationSchema = yup.object({
  name: yup
    .string()
    .min(4, ValidationMessage.NameMinimumLength)
    .max(20, ValidationMessage.NameMaximumLength)
    .required(ValidationMessage.NameRequired)
    .matches(nameRegex, ValidationMessage.NameFormat)
    .when({
      is: negate(isEmpty),
      then: schema => schema.test(
          'name is available',
          ValidationMessage.NameTaken,
          async name => (await axios.get(qc.stringifyUrl({
            url: '/api/user/check-name',
            query: { name },
          }))).data,
        ),
    }),
  email: yup
    .string()
    .email(ValidationMessage.InvalidFormat)
    .required(ValidationMessage.EmailRequired)
    .when({
      is: negate(isEmpty),
      then: schema => schema.test(
          'email is available',
          ValidationMessage.EmailTaken,
          async email => (await axios.get(qc.stringifyUrl({
            url: '/api/user/check-email',
            query: { email },
          }))).data,
        ),
    }),
  password: yup
    .string()
    .min(5, ValidationMessage.PasswordMinimumLength)
    .max(30, ValidationMessage.PasswordMaximumLength)
    .required(ValidationMessage.PasswordRequired)
    .matches(hasCapitalRegex, ValidationMessage.PasswordCapitals)
    .matches(hasDigitRegex, ValidationMessage.PasswordDigits)
    .matches(hasSpecialRegex, ValidationMessage.PasswordSpecial),
  confirmPassword: yup
    .string()
    .required(ValidationMessage.PasswordRequired)
    .equals([yup.ref('password')], ValidationMessage.PasswordUnmatch),
});

export const loginSchema = yup.object({
  name: yup.string().required(),
  password: yup.string().required(),
})
