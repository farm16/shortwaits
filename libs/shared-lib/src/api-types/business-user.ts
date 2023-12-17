import { BusinessUserType } from "../models-types";

import { CommonResponseType } from ".";
import { ConvertToDtoType, WithDbProps } from "../common-types";

export type BusinessUserDtoType = ConvertToDtoType<WithDbProps<BusinessUserType>>;
export type BusinessUsersDtoType = BusinessUserDtoType[];
export type BusinessUserResponseType = CommonResponseType<BusinessUserDtoType>;
export type BusinessUsersResponseType = CommonResponseType<BusinessUsersDtoType>;

export type CreateBusinessUserDtoType = Omit<
  BusinessUserDtoType,
  | "_id"
  | "__v"
  | "registrationState"
  | "businesses"
  | "deleted"
  | "createdAt"
  | "updatedAt"
  | "lastSignInAt"
  | "roleId"
  | "hashedRt"
  | "isDisabled"
  | "userRoles"
  | "createdByBusinessId"
  | "isEmailVerified"
>;
export type CreateBusinessUsersDtoType = CreateBusinessUserDtoType[];

export type BusinessUserUpdateDtoType = Partial<BusinessUserDtoType>; // update is only done for each business user (staff)
