import { ConvertToDtoType, ServicesType } from "..";

import { DocType, CommonResponseType } from ".";

export type ServiceDocType = DocType<ServicesType>;
export type ServicesDocType = ServiceDocType[];

export type ServiceDtoType = ConvertToDtoType<ServiceDocType>;
export type ServicesDtoType = ServiceDtoType[];

export type ServiceResponseType = CommonResponseType<ServiceDtoType>;
export type ServicesResponseType = CommonResponseType<ServicesDtoType>;

export type ServicesSuccessFnType = (
  payload: ServicesDocType,
  message: string
) => ServicesResponseType;
