// warning:
// don't remove this comment
import { Document } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// end of warning //

import { ObjectId } from "../common";
import { AddressType, Alias, ClientRegistration, CurrentMembershipType, LocaleType, PhoneNumberType, SocialAccountType, UserAccountSettings, UserDeviceSettings } from "./common";

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

export type LocalClientType = {
  shortId: string;
  clientType: "local"; // local means the user is created by the admin, external means the user is created by the client
  // contact =========
  username: string;
  alias: Alias;
  displayName: string;
  familyName: string;
  givenName: string;
  middleName: string;
  accountImageUrl: string;
  email: string;
  password: string;
  locale: LocaleType;
  phoneNumbers: PhoneNumberType[];
  imAddresses: {
    username: string;
    service: string;
  }[];
  addresses: AddressType[];
  isSocialAccount: boolean;
  socialAccount: SocialAccountType;
  deviceSettings: UserDeviceSettings[];
  accountSettings: UserAccountSettings;
  desiredCurrencies: string[];
  // below are fields from the that are not in the AddClientDtoType
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
  registration: ClientRegistration;
  currentMembership: CurrentMembershipType;
};

export type LocalClientUserDocumentType = LocalClientType & Document;
