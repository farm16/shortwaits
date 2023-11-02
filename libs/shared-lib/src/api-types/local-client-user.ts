import { LocalClientUserType } from "../models-types";

import { CommonResponseType } from ".";
import { ConvertToDtoType, WithDbProps } from "../common-types";

export type LocalClientUserDtoType = ConvertToDtoType<WithDbProps<LocalClientUserType>>;
export type LocalClientUsersDtoType = LocalClientUserDtoType[];
export type LocalClientUserResponseType = CommonResponseType<LocalClientUserDtoType>;
export type LocalClientUsersResponseType = CommonResponseType<LocalClientUsersDtoType>;

export type CreateLocalClientUserDtoType = Omit<
  LocalClientUserDtoType,
  "_id" | "__v" | "billing" | "businesses" | "deleted" | "createdAt" | "updatedAt" | "lastSignInAt" | "roleId" | "hashedRt" | "registration" | "currentMembership"
>;
export type CreateLocalClientUsersDtoType = CreateLocalClientUserDtoType[];

export type LocalClientUserUpdateDtoType = Partial<LocalClientUserDtoType>;
