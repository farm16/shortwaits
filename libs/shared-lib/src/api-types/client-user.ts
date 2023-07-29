import { ClientUserType } from "../models-types";

import { CommonResponseType } from ".";
import { ConvertToDtoType, WithDbProps } from "../common-types";

export type ClientUserDtoType = ConvertToDtoType<WithDbProps<ClientUserType>>;
export type ClientUsersDtoType = ClientUserDtoType[];
export type ClientUserResponseType = CommonResponseType<ClientUserDtoType>;
export type ClientUsersResponseType = CommonResponseType<ClientUsersDtoType>;

export type ClientUserCreateDtoType = Omit<
  ClientUserDtoType,
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

export type ClientUserUpdateDtoType = Partial<ClientUserCreateDtoType>;
