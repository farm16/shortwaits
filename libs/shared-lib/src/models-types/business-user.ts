// warning:
// don't remove this comment
import { Document, PaginateModel } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as paginate from "mongoose-paginate-v2";
// end of warning //

import { ObjectId } from "../common-types";

/**
 *
 * regarding methods and statics and TS
 * @link https://github.com/Automattic/mongoose/issues/10358
 *
 * regarding methods and statics (password hashing method)
 * @link https://mongoosejs.com/docs/guide.html#:~:text=Do%20not%20declare%20methods%20using%20ES6%20arrow%20functions%20(%3D%3E).%20Arrow%20functions%20explicitly%20prevent%20binding%20this%2C%20so%20your%20method%20will%20not%20have%20access%20to%20the%20document%20and%20the%20above%20examples%20will%20not%20work.
 *
 */

export type UserMethodsType = {
  encryptPassword: (param1: string) => Promise<string>;
  matchPassword: (param1: string) => Promise<boolean>;
};

export type BusinessUserType = {
  businesses: ObjectId[];
  alias: "familyName" | "givenName" | "middleName" | "displayName";
  displayName: string;
  //
  familyName: string;
  givenName: string;
  middleName: string;
  accountImageUrl: string;
  phoneNumbers: {
    label: string;
    number: string;
  }[];
  imAddresses: {
    username: string;
    service: string;
  }[];
  addresses: {
    label: string;
    address1: string;
    address2: string;
    city: string;
    region: string;
    state: string;
    postCode: number;
    country: string;
  }[];
  socialAccounts: {
    kind: string;
    uid?: string;
    username?: string;
    password?: string;
  }[];
  birthday: {
    year: number;
    month: number;
    day: number;
  };
  registrationState: {
    screenName: string;
    state: number;
    isCompleted: boolean;
  };
  email: string;
  password?: string;
  desiredCurrencies: string[];
  locale: {
    countryCode: string;
    isRTL: boolean;
    languageCode: string;
    languageTag: string;
  };
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  lastSignInAt: Date;
  roleId: ObjectId;
  hashedRt: string;
};

export type BusinessUserDocument = BusinessUserType & Document;
