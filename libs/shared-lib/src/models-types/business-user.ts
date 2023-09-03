// warning:
// don't remove this comment
import { Document, PaginateModel } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as paginate from "mongoose-paginate-v2";
// end of warning //

import { ObjectId } from "../common-types";
import { WeekHoursType } from "./helpers";

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
  roleId: ObjectId;
  password: string;
  isPasswordProtected: boolean;
  businesses: ObjectId[];
  isDisabled: boolean; // if this is set to true, the user will not be able to login but user will be visible in the list of users

  isStaff: boolean; // all users created by a business are staff, only superAdmins are not staff
  createdByBusinessId: ObjectId; // if this is set and user "A" is superAdmin, user "A" can delete or update this user
  // Also we need to let the user know that this user is created by a business (super admin) and belongs to that business
  deleted: boolean; // will not be shown in the list of users, but the data will be kept

  preferredAlias: "username" | "displayName";

  username: string; // this should be unique for each user (business)

  email: string; // no longer unique for each user (business)
  isEmailVerified: boolean; // once email is verified, this should be set to true
  hours: WeekHoursType;

  displayName: string;
  familyName: string;
  givenName: string;
  middleName: string;

  accountImageUrl: string;

  primaryPhoneNumberLabel: string; // this should be unique for each user (business)' should be mobile
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
  birthday: string;

  desiredCurrencies: string[];
  locale: {
    countryCode: string;
    isRTL: boolean;
    languageCode: string;
    languageTag: string;
  };
  // bellow are fields from the that are not in the CreateBusinessUserDtoType
  registrationState: {
    screenName: string;
    state: number;
    isCompleted: boolean;
  };

  createdAt: string;
  updatedAt: string;
  lastSignInAt: Date;
  hashedRt: string;
};

export type BusinessUserDocument = BusinessUserType & Document;
