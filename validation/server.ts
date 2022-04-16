import * as yup from 'yup';
import axios from 'axios';

import { ValidationMessage } from 'validation/message';
import { nameRegex, hasDigitRegex, hasCapitalRegex, hasSpecialRegex } from 'validation/regex';
import { ValidationShape } from 'validation/types';

import { UserService } from 'services';

export const registrationSchema: ValidationShape = {
  name: yup
    .string()
    .min(4, ValidationMessage.NameMinimumLength)
    .max(20, ValidationMessage.NameMaximumLength)
    .required(ValidationMessage.NameRequired)
    .matches(nameRegex, ValidationMessage.NameFormat)
    .test(
      'name is available',
      ValidationMessage.NameTaken,
      async name => !(await UserService.isNameTaken(name!)),
    ),
  email: yup
    .string()
    .email(ValidationMessage.InvalidFormat)
    .required(ValidationMessage.EmailRequired)
    .test(
      'email is available',
      ValidationMessage.EmailTaken,
      async email => !(await UserService.isEmailTaken(email!)),
    ),
  password: yup
    .string()
    .min(5, ValidationMessage.PasswordMinimumLength)
    .max(30, ValidationMessage.PasswordMaximumLength)
    .required(ValidationMessage.PasswordRequired)
    .matches(hasCapitalRegex, ValidationMessage.PasswordCapitals)
    .matches(hasDigitRegex, ValidationMessage.PasswordDigits)
    .matches(hasSpecialRegex, ValidationMessage.PasswordSpecial),
};
