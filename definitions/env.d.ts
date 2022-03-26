declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';

      DB_NAME: string;
      DB_PASSWORD: string;
      DB_USER: string;
      DB_PORT: string;
    }
  }
}

export {};

