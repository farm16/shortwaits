import { BusinessDtoType, CommonResponseType, DtoFriendlyType, WithDbProps } from "../../../";
import { LocalClientType } from "../models";

export type LocalClientDtoType = DtoFriendlyType<WithDbProps<LocalClientType>>;
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

export type ProtectedPartialLocalClientDtoType = Partial<DtoFriendlyType<Omit<LocalClientType, ForbidFields>>>;
export type PartialLocalClientDtoType = Partial<LocalClientDtoType>;

export type AddLocalClientDtoType = ProtectedPartialLocalClientDtoType;
export type AddLocalClientsDtoType = ProtectedPartialLocalClientDtoType[];
export type UpdateLocalClientDtoType = PartialLocalClientDtoType;
export type UpdateLocalClientsDtoType = UpdateLocalClientDtoType[];
export type DeleteLocalClientsDtoType = UpdateLocalClientDtoType[];
