import { CommonResponseType } from ".";
import { ConvertToDtoType, WithDbProps } from "../common";
import { ClientType } from "../models";

export type ClientDtoType = ConvertToDtoType<WithDbProps<ClientType>>;
export type ClientsDtoType = ClientDtoType[];

export type ClientResponseType = CommonResponseType<ClientDtoType>;
export type ClientsResponseType = CommonResponseType<ClientsDtoType>;

type ForbidFields =
  | "_id"
  | "shortId"
  | "__v"
  | "billing"
  | "businesses"
  | "deleted"
  | "createdAt"
  | "updatedAt"
  | "lastSignInAt"
  | "roleId"
  | "hashedRt"
  | "registration"
  | "currentMembership";

export type AddClientToBusinessDtoType = {
  shortId: string;
};

type _UpdateClientDtoType = Partial<ConvertToDtoType<Omit<ClientType, ForbidFields>>>;

export type AddClientDtoType = _UpdateClientDtoType;
export type AddClientsDtoType = AddClientDtoType[];

export type UpdateClientDtoType = _UpdateClientDtoType;
export type UpdateClientsDtoType = UpdateClientDtoType[];
