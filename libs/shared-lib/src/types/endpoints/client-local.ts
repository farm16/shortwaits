import { BusinessDtoType, CommonResponseType } from ".";
import { ConvertToDtoType, WithDbProps } from "../common";
import { LocalClientType } from "../models";

export type LocalClientDtoType = ConvertToDtoType<WithDbProps<LocalClientType>>;
export type LocalClientsDtoType = LocalClientDtoType[];

export type LocalClientResponseType = CommonResponseType<LocalClientDtoType>;
export type LocalClientsResponseType = CommonResponseType<LocalClientsDtoType>;

export type AddLocalClientResponseType = CommonResponseType<{
  localClient: LocalClientDtoType;
  business: BusinessDtoType;
}>;
export type AddLocalClientsResponseType = CommonResponseType<{
  localClients: LocalClientsDtoType;
  business: BusinessDtoType;
}>;

type ForbidFields =
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

type _AddLocalClientDtoType = Partial<ConvertToDtoType<Omit<LocalClientType, ForbidFields>>>;
type _UpdateLocalClientDtoType = Partial<LocalClientDtoType>;

export type AddLocalClientDtoType = _AddLocalClientDtoType;
export type AddLocalClientsDtoType = AddLocalClientDtoType[];

export type UpdateLocalClientDtoType = _UpdateLocalClientDtoType;
export type UpdateLocalClientsDtoType = UpdateLocalClientDtoType[];
