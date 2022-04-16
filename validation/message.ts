export enum ValidationMessage {
  NameTaken = 'Имя занято',
  NameFormat = 'Разрешены только цифры, латиница и нижнее тире',
  NameRequired = 'Введите имя',
  NameMinimumLength = 'Длина имени должна быть не меньше ${min}',
  NameMaximumLength = 'Длина имени не должна быть больше ${max}',

  EmailTaken = 'Адрес занят',
  EmailRequired = 'Введите E-Mail',

  PasswordRequired = 'Введите пароль',
  PasswordCapitals = 'Пароль должен иметь заглавную букву',
  PasswordDigits = 'Пароль должен иметь цифры',
  PasswordSpecial = 'Пароль должен иметь специальные символы',
  PasswordUnmatch = 'Пароли не совпадают',
  PasswordMinimumLength = 'Длина пароля должна быть не меньше ${min}',
  PasswordMaximumLength = 'Длина пароля не должна быть больше ${max}',

  InvalidFormat = 'Некорректный формат',
}
