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
>;

export type BusinessUserUpdateDtoType = Partial<CreateBusinessUserDtoType>;
