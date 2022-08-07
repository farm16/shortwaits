import { Document, PaginateModel } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as paginate from 'mongoose-paginate-v2';

import { ObjectId } from '../common';

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
  readonly encryptPassword: (param1: string) => Promise<string>;
  readonly matchPassword: (param1: string) => Promise<boolean>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UserModelType = PaginateModel<UserType, any, UserMethodsType>;

export type UserDocType = UserType & Document;

export type UserType = {
  readonly businesses: readonly ObjectId[];
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly address: {
    readonly address1: string;
    readonly address2: string;
    readonly city: string;
    readonly state: string;
    readonly zip: number;
    readonly countryCode: string;
  };
  readonly accounts: readonly {
    readonly kind: string;
    readonly uid?: string;
    readonly username?: string;
    readonly password?: string;
  }[];
  readonly registrationState: {
    readonly screenName: string;
    readonly state: number;
    readonly isCompleted: boolean;
  };
  readonly email: string;
  readonly password?: string;
  readonly desiredCurrencies: readonly string[];
  readonly locale: {
    readonly countryCode: string;
    readonly isRTL: boolean;
    readonly languageCode: string;
    readonly languageTag: string;
  };
  readonly deleted: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly lastSignInAt: string;
  readonly rolId: ObjectId;
};
