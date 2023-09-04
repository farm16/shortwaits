import { BusinessType, ClientUserType, ConvertToDtoType, MethodType, WithDbProps } from "..";
import { CommonResponseType, GeneralSpecShape, BusinessUserDtoType, BusinessUsersDtoType } from ".";

export type BusinessDtoType = ConvertToDtoType<WithDbProps<BusinessType>>;

export type BusinessResponseType = CommonResponseType<BusinessDtoType>;

export type UpdateBusinessDtoType = Omit<
  BusinessDtoType,
  | "admins"
  | "superAdmins"
  | "backgroundAdmins"
  | "deleted"
  | "createdBy"
  | "createdAt"
  | "isRegistrationCompleted"
  | "accountType"
  | "shortId"
  | "_id"
>;

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
