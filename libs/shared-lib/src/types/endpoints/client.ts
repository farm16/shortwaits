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

type ProtectedPartialClientDtoType = Partial<ConvertToDtoType<Omit<ClientType, ForbidFields>>>;
type PartialClientDtoType = Partial<ClientDtoType>;

export type AddClientDtoType = ProtectedPartialClientDtoType;
export type AddClientsDtoType = ProtectedPartialClientDtoType[];

export type UpdateClientDtoType = PartialClientDtoType;
export type UpdateClientsDtoType = PartialClientDtoType[];
