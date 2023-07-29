import { BusinessType, ClientUserType, ConvertToDtoType, MethodType } from "..";
import { CommonResponseType, DocType, GeneralSpecShape, BusinessUserDtoType, BusinessUsersDtoType } from ".";

export type BusinessDtoType = ConvertToDtoType<BusinessDocType>;

export type BusinessDocType = DocType<BusinessType>;

export type BusinessResponseType = CommonResponseType<BusinessDtoType>;

export type BusinessSuccessFnType = (payload: BusinessDocType, message: string) => BusinessResponseType;

export type BusinessEndpointsMethods = "POST" | "GET" | "PUT" | "DELETE";

export interface BusinessEndpointsTypes extends GeneralSpecShape {
  "/business": {
    path: `/business`;
    methods: {
      PUT: MethodType<BusinessDtoType, undefined, BusinessDtoType>;
    };
  };
  "/business/register": {
    path: `/business/register`;
    methods: {
      PUT: MethodType<BusinessDtoType, undefined, BusinessDtoType>;
    };
  };
  "/business/:businessId": {
    path: `/business/${string}`;
    methods: {
      GET: MethodType<BusinessDtoType>;
    };
  };
  "/business/:businessId/admins": {
    path: `/business/${string}/admin`;
    methods: {
      GET: MethodType<BusinessDtoType>;
    };
  };
  "/business/:businessId/services": {
    path: `/business/${string}/services`;
    methods: {
      GET: MethodType<BusinessDtoType>;
      PUT: MethodType<BusinessDtoType>;
      POST: MethodType<BusinessDtoType>;
    };
  };
  "/business/:businessId/categories": {
    path: `/business/${string}/categories`;
    methods: {
      GET: MethodType<BusinessDtoType["services"]>;
    };
  };
  "/business/:businessId/staff": {
    path: `/business/${string}/staff`;
    methods: {
      GET: MethodType<BusinessUsersDtoType>;
      POST: MethodType<BusinessUserDtoType>;
    };
  };
  "/business/:businessId/clients": {
    path: `/business/${string}/clients`;
    methods: {
      GET: MethodType<BusinessUsersDtoType>;
      POST: MethodType<Partial<ClientUserType>[]>;
    };
  };
  "/business/:businessId/hours": {
    path: `/business/${string}/hours`;
    methods: {
      GET: MethodType<BusinessDtoType["hours"]>;
      PUT: MethodType<BusinessDtoType["hours"]>;
    };
  };
}
