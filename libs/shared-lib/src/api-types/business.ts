import { ClientUsersDtoType, CommonResponseType, LocalClientUsersDtoType } from ".";
import { BusinessType, ConvertToDtoType, WithDbProps } from "..";

export type BusinessDtoType = ConvertToDtoType<WithDbProps<BusinessType>>;

export type BusinessResponseType = CommonResponseType<BusinessDtoType>;

export type UpdateBusinessDtoType = Partial<
  Omit<
    ConvertToDtoType<BusinessType>,
    "admins" | "superAdmins" | "backgroundAdmins" | "deleted" | "createdBy" | "createdAt" | "isRegistrationCompleted" | "accountType" | "shortId" | "_id"
  >
>;

export type AllBusinessClientsType = {
  localClients: LocalClientUsersDtoType;
  clients: ClientUsersDtoType;
  allClients: ClientUsersDtoType & LocalClientUsersDtoType;
};

export type AllBusinessClientsResponseType = CommonResponseType<AllBusinessClientsType>;
