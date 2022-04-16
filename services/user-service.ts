import { hashSync } from 'bcrypt';

import { prisma } from 'lib';

export interface CreateUserData {
  name: string;
  password: string;
  email: string;
}

export class UserService {
  static async register({ name, email, password }: CreateUserData) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    const userPassword = await prisma.password.create({
      data: {
        userId: user.id,
        value: hashSync(password, 10),
      },
    });

    return user;
  }

  static async isEmailTaken(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return !!user;
  }

  static async isNameTaken(name: string) {
    const user = await prisma.user.findUnique({ where: { name } });
    return !!user;
  }
}
