// warning:
// don't remove this comment
import { Document } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export type LocalClientUserMethodsType = {
  encryptPassword: (param1: string) => Promise<string>;
  matchPassword: (param1: string) => Promise<boolean>;
};

export type LocalClientUserType = {
  clientType: "local" | "external"; // local means the user is created by the admin, external means the user is created by the client
  username: string;
  alias: "username" | "familyName" | "givenName" | "middleName" | "displayName";
  displayName: string;
  familyName: string;
  givenName: string;
  middleName: string;
  accountImageUrl: string;
  email: string;
  password: string;
  locale: {
    countryCode: string;
    isRTL: boolean;
    languageCode: string;
    languageTag: string;
  };
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
    postCode: string;
    country: string;
  }[];
  socialAccounts: {
    kind: string;
    uid?: string;
    username?: string;
  }[];
  desiredCurrencies: string[];
  // below are fields from the that are not in the CreateClientUserDtoType
  billing: {
    invoiceId: ObjectId;
  };
  businesses: ObjectId[];
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  lastSignInAt: Date;
  roleId: ObjectId;
  hashedRt: string;
  registration: {
    isRegistered: boolean; // if the user has completed the registration process ( code 2)
    state: {
      screenName: string;
      state: 0 | 1 | 2 | 3 | 4; // 0: not started, 1: started, 2: completed , 3:verified, 4: failed
      messages: string[]; // messages to be displayed to the user based on the state
      isPendingVerification: boolean; // if the user has completed the registration process but the email is not verified yet
    };
  };
  currentMembership: {
    membershipId: ObjectId;
    membershipShortId: string;
    membershipShortName: string;
    status: string;
    invoiceId: ObjectId;
    isFaulty: boolean;
    faultyReason: string[];
  };
};

export type LocalClientUserDocumentType = LocalClientUserType & Document;
