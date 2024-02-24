import { CommonResponseType } from ".";
import { ConvertToDtoType, WithDbProps } from "../common";
import { ClientUserType } from "../models";

export type ClientUserDtoType = ConvertToDtoType<WithDbProps<ClientUserType>>;
export type ClientUsersDtoType = ClientUserDtoType[];
export type ClientUserResponseType = CommonResponseType<ClientUserDtoType>;
export type ClientUsersResponseType = CommonResponseType<ClientUsersDtoType>;

export type CreateClientUserDtoType = Omit<
  ClientUserDtoType,
  "_id" | "shortId" | "__v" | "billing" | "businesses" | "deleted" | "createdAt" | "updatedAt" | "lastSignInAt" | "roleId" | "hashedRt" | "registration" | "currentMembership"
>;

export type AddClientToBusinessDtoType = {
  shortId: string;
};

export type CreateClientUsersDtoType = CreateClientUserDtoType[];

export type ClientUserUpdateDtoType = Partial<ClientUserDtoType>;
