import { Document } from "mongoose";
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
    isDisabled: boolean;
    isStaff: boolean;
    createdByBusinessId: ObjectId;
    deleted: boolean;
    preferredAlias: "username" | "displayName";
    username: string;
    email: string;
    isEmailVerified: boolean;
    hours: WeekHoursType;
    displayName: string;
    familyName: string;
    givenName: string;
    middleName: string;
    accountImageUrl: string;
    primaryPhoneNumberLabel: string;
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
