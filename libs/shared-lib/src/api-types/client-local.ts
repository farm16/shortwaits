import { LocalClientUserType } from "../models-types";

import { BusinessDtoType, CommonResponseType } from ".";
import { ConvertToDtoType, WithDbProps } from "../common-types";

export type LocalClientDtoType = ConvertToDtoType<WithDbProps<LocalClientUserType>>;
export type LocalClientsDtoType = LocalClientDtoType[];

export type LocalClientUserResponseType = CommonResponseType<LocalClientDtoType>;
export type LocalClientUsersResponseType = CommonResponseType<LocalClientsDtoType>;

export type AddLocalClientResponseType = CommonResponseType<{
  localClientUser: LocalClientDtoType;
  business: BusinessDtoType;
}>;
export type AddLocalClientsResponseType = CommonResponseType<{
  localClientUsers: LocalClientsDtoType;
  business: BusinessDtoType;
}>;

type ForbidUpdateFields =
  | "_id"
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
  | "currentMembership"
  | "password";

type _UpdateLocalClientDtoType = Partial<ConvertToDtoType<Omit<LocalClientUserType, ForbidUpdateFields>>>;

export type AddLocalClientDtoType = _UpdateLocalClientDtoType;
export type AddLocalClientsDtoType = AddLocalClientDtoType[];

export type UpdateLocalClientDtoType = _UpdateLocalClientDtoType;
export type UpdateLocalClientsDtoType = UpdateLocalClientDtoType[];
