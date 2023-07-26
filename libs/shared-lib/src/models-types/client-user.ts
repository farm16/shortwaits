import { Document, PaginateModel } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as paginate from "mongoose-paginate-v2";

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

export type ClientUserMethodsType = {
  encryptPassword: (param1: string) => Promise<string>;
  matchPassword: (param1: string) => Promise<boolean>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClientUserModelType = PaginateModel<
  ClientUserType,
  any,
  ClientUserMethodsType
>;

export type ClientUserDocType = ClientUserType & Document;

export type ClientUserType = {
  // "partial" comes from imported contacts
  // or added manually added from admin app,
  // "full" clients registered from client app
  clientType: "partial" | "full";
  registration: {
    state: string;
    stateDescriptions: string[];
    isRegistered: boolean;
  };
  currentMembership: {
    membershipTypeId: ObjectId;
    invoiceId: ObjectId;
    type: string;
    price: number;
    code: string;
    status: string;
    description: string;
    isFaulty: boolean;
    faultyReason: string[];
  };
  billing: {
    // billing info cc stripe etc
    invoiceId: ObjectId;
  };
  businesses: ObjectId[];
  doe: Date;
  username: string;
  alias: "username" | "familyName" | "givenName" | "middleName" | "displayName";
  displayName: string;
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
  rolId: ObjectId;
  hashedRt: string;
};
