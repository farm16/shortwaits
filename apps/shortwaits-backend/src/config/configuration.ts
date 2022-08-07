import { JwtModuleOptions } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const keyPath = process.env.JWT_KEY_PATH;
const PRIV_KEY = fs.readFileSync(keyPath + 'id_rsa_priv.pem', 'utf8');
const PUB_KEY = fs.readFileSync(keyPath + 'id_rsa_pub.pem', 'utf8');

export interface ConfigurationType {
  http: {
    host: string;
    port: string;
  };
  db: {
    mongo: {
      database: string;
      url: string;
      port: number | string;
    };
  };
  jwt: SignOptions & JwtModuleOptions;
}

const configuration: ConfigurationType = {
  http: {
    host: process.env.HTTP_HOST,
    port: process.env.HTTP_PORT,
  },
  db: {
    mongo: {
      database: process.env.MONGO_DB_DATABASE,
      url: process.env.MONGO_DB_URL,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
  },
  jwt: {
    publicKey: PUB_KEY,
    privateKey: PRIV_KEY,
    algorithm: 'RS256',
    expiresIn: '1d',
  },
};

export default configuration;
