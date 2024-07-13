import { BusinessType, BusinessUsersDtoType, ClientsDtoType, CommonResponseType, DtoFriendlyType, EventDtoType, LocalClientsDtoType, WithDbProps } from "../../../";

export type BusinessDtoType = DtoFriendlyType<WithDbProps<BusinessType>>;

export type BusinessResponseType = CommonResponseType<BusinessDtoType>;

export type UpdateBusinessDtoType = Partial<
  Omit<
    DtoFriendlyType<BusinessType>,
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
