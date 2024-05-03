import { BusinessUsersDtoType, ClientsDtoType, CommonResponseType, EventDtoType, LocalClientsDtoType } from ".";
import { BusinessType, ConvertToDtoType, WithDbProps } from "..";

export type BusinessDtoType = ConvertToDtoType<WithDbProps<BusinessType>>;

export type BusinessResponseType = CommonResponseType<BusinessDtoType>;

export type UpdateBusinessDtoType = Partial<
  Omit<
    ConvertToDtoType<BusinessType>,
    "admins" | "superAdmins" | "backgroundAdmins" | "deleted" | "createdBy" | "createdAt" | "isRegistrationCompleted" | "accountType" | "shortId" | "_id"
  >
>;

export type PeopleInEvent = {
  businessUsers: BusinessUsersDtoType;
  clients: ClientsDtoType;
  localClients: LocalClientsDtoType;
  event: EventDtoType;
};

export type BusinessClients = {
  clients: ClientsDtoType;
  localClients: LocalClientsDtoType;
};

export type BusinessClientsResponseType = CommonResponseType<BusinessClients>;
