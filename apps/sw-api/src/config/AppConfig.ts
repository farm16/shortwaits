const appConfig = {
  NODE_ENV: "",
  MONGO_DB_DATABASE: "",
  MONGO_DB_PORT: "",
  MONGO_DB_URL: "",
  HTTP_HOST: "",
  HTTP_PORT: "",
  SALT_ROUNDS: "",
  AT_SECRET: "",
  RT_SECRET: "",
  AT_EXPIRES_IN: "",
  RT_EXPIRES_IN: "",
};
export type AppConfig = keyof typeof appConfig;
