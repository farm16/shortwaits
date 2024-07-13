import { CommonResponseType, DtoFriendlyType, ServiceType, WithDbProps } from "../../..";

export type ServiceDtoType = DtoFriendlyType<WithDbProps<ServiceType>>;
export type ServicesDtoType = ServiceDtoType[];

export type CreateServiceDtoType = Omit<ServiceDtoType, "_id" | "createdAt" | "updatedAt" | "__v" | "updatedBy" | "createdBy" | "deleted">;
export type UpdateServiceDtoType = Partial<ServiceDtoType>;

export type ServiceResponseType = CommonResponseType<ServiceDtoType>;
export type ServicesResponseType = CommonResponseType<ServicesDtoType>;
