import { ClientUserType } from "../models-types";

import { CommonResponseType } from ".";
import { ConvertToDtoType, WithDbProps } from "../common-types";

export type ClientUserDtoType = ConvertToDtoType<WithDbProps<ClientUserType>>;
export type ClientUsersDtoType = ClientUserDtoType[];
export type ClientUserResponseType = CommonResponseType<ClientUserDtoType>;
export type ClientUsersResponseType = CommonResponseType<ClientUsersDtoType>;

export type CreateClientUserDtoType = Omit<
  ClientUserDtoType,
  | "_id"
  | "__v"
  | "billing"
  | "password"
  | "businesses"
  | "deleted"
  | "createdAt"
  | "updatedAt"
  | "lastSignInAt"
  | "roleId"
  | "hashedRt"
  | "registration"
  | "currentMembership"
>;
export type CreateClientUsersDtoType = CreateClientUserDtoType[];

export type ClientUserUpdateDtoType = Partial<ClientUserDtoType>;
