import { ConvertToDtoType, ServiceType, WithDbProps } from "..";

import { CommonResponseType } from ".";

export type ServiceDtoType = ConvertToDtoType<WithDbProps<ServiceType>>;
export type ServicesDtoType = ServiceDtoType[];

export type CreateServiceDtoType = Omit<
  ServiceDtoType,
  "_id" | "createdAt" | "updatedAt" | "__v" | "updatedBy" | "createdBy" | "deleted"
>;

export type ServiceResponseType = CommonResponseType<ServiceDtoType>;
export type ServicesResponseType = CommonResponseType<ServicesDtoType>;
