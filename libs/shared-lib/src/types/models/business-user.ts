// warning:
// don't remove this comment
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// end of warning //

import { ObjectId } from "../common";
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

export type BusinessUserRole = "admin" | "superAdmin" | "backgroundAdmin" | "staff";
export type BusinessUserRoles = BusinessUserRole[];

export type BusinessUserType = {
  roleId: ObjectId;
  password: string;
  isPasswordProtected: boolean;
  businesses: ObjectId[];
  isDisabled: boolean; // if this is set to true, the user will not be able to login but user will be visible in the list of users
  userRoles: {
    isStaff: boolean;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    isBackgroundAdmin: boolean;
  };
  createdByBusinessId: ObjectId; // if this is set and user "A" is superAdmin, user "A" can delete or update this user
  // Also we need to let the user know that this user is created by a business (super admin) and belongs to that business
  deleted: boolean; // will not be shown in the list of users, but the data will be kept
  registrationState: {
    screenName: string;
    state: number;
    isCompleted: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  lastSignInAt: Date;
  hashedRt: string;
  isEmailVerified: boolean; // once email is verified, this should be set to true

  // below are fields that are not protected
  preferredAlias: "username" | "displayName";
  username: string; // this should be unique for each user (business)
  displayName: string;
  familyName: string;
  givenName: string;
  middleName: string;
  email: string; // no longer unique for each user (business)
  hours: WeekHoursType;
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
};
