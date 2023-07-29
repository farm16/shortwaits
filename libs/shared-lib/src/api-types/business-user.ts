import { BusinessUserType } from "../models-types";

import { CommonResponseType } from ".";
import { ConvertToDtoType, WithDbProps } from "../common-types";

export type BusinessUserDtoType = ConvertToDtoType<WithDbProps<BusinessUserType>>;
export type BusinessUsersDtoType = BusinessUserDtoType[];
export type BusinessUserResponseType = CommonResponseType<BusinessUserDtoType>;
export type BusinessUsersResponseType = CommonResponseType<BusinessUsersDtoType>;

export type BusinessUserCreateDtoType = Omit<
  BusinessUserDtoType,
  | "_id"
  | "__v"
  | "registration"
  | "currentMembership"
  | "billing"
  | "hashedRt"
  | "roleId"
  | "deleted"
  | "createdAt"
  | "updatedAt"
  | "lastSignInAt"
  | "businesses"
>;

export type BusinessUserUpdateDtoType = Partial<BusinessUserCreateDtoType>;
