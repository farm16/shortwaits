import { existsSync } from "fs";
import { resolve } from "path";

const NODE_ENV = process.env.NODE_ENV;
const ASSETS_PATH = `${__dirname}/assets/`;

export function getEnvPath() {
  const filename = NODE_ENV === "production" ? `.env` : ".env.development";

  const filePath = resolve(ASSETS_PATH + filename);

  if (!existsSync(filePath)) {
    throw new Error("Cannot find env file!!!");
  }

  return filePath;
}
