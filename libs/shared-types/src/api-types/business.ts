import { BusinessHoursType, BusinessType } from "..";

import {
  CommonResponseType,
  DocType,
  GeneralSpecShape,
  ServicesPayloadType,
  SuccessResponseType,
  UserPayloadType,
} from ".";

export type BusinessSuccessResponseType =
  SuccessResponseType<BusinessPayloadType>;

export type BusinessPayloadType = DocType<BusinessType>;

export type BusinessSuccessFnType = (
  payload: BusinessPayloadType,
  message: string
) => BusinessSuccessResponseType;

export type BusinessEndpoints = keyof BusinessEndpointsTypes;

export type BusinessEndpointsPaths =
  | BusinessEndpointsTypes["/business"]["path"]
  | BusinessEndpointsTypes["/business/:business_id"]["path"]
  | BusinessEndpointsTypes["/business/:business_id/admins"]["path"]
  | BusinessEndpointsTypes["/business/:business_id/services"]["path"]
  | BusinessEndpointsTypes["/business/:business_id/categories"]["path"]
  | BusinessEndpointsTypes["/business/:business_id/staff"]["path"]
  | BusinessEndpointsTypes["/business/:business_id/clients"]["path"]
  | BusinessEndpointsTypes["/business/:business_id/hours"]["path"]
  | BusinessEndpointsTypes["/business"]["path"];

export type BusinessEndpointsMethods =
  | keyof BusinessEndpointsTypes["/business"]["methods"]
  | keyof BusinessEndpointsTypes["/business/:business_id"]["methods"]
  | keyof BusinessEndpointsTypes["/business/:business_id/admins"]["methods"]
  | keyof BusinessEndpointsTypes["/business/:business_id/services"]["methods"]
  | keyof BusinessEndpointsTypes["/business/:business_id/categories"]["methods"]
  | keyof BusinessEndpointsTypes["/business/:business_id/staff"]["methods"]
  | keyof BusinessEndpointsTypes["/business/:business_id/hours"]["methods"]
  | keyof BusinessEndpointsTypes["/business"]["methods"];

export interface BusinessEndpointsTypes extends GeneralSpecShape {
  "/business": {
    path: `/business`;
    methods: {
      PUT: {
        query: undefined;
        body: BusinessPayloadType;
        response: BusinessPayloadType;
      };
    };
  };
  "/business/register": {
    path: `/business/register`;
    methods: {
      PUT: {
        query: undefined;
        body: BusinessPayloadType;
        response: BusinessPayloadType;
      };
    };
  };
  "/business/:business_id": {
    path: `/business/${string}`;
    methods: {
      GET: {
        query: undefined;
        body: undefined;
        response: BusinessType;
      };
    };
  };
  "/business/:business_id/admins": {
    path: `/business/${string}/admin`;
    methods: {
      GET: {
        query: undefined;
        body: undefined;
        response: BusinessType;
      };
    };
  };
  "/business/:business_id/services": {
    path: `/business/${string}/services`;
    methods: {
      GET: {
        query: undefined;
        body: undefined;
        response: ServicesPayloadType;
      };
      PUT: {
        query: undefined;
        body: ServicesPayloadType;
        response: ServicesPayloadType;
      };
      POST: {
        query: undefined;
        body: ServicesPayloadType;
        response: ServicesPayloadType;
      };
    };
  };
  "/business/:business_id/categories": {
    path: `/business/${string}/categories`;
    methods: {
      GET: {
        query: undefined;
        body: undefined;
        response: BusinessType;
      };
    };
  };
  "/business/:business_id/staff": {
    path: `/business/${string}/staff`;
    methods: {
      GET: {
        query: undefined;
        body: undefined;
        response: BusinessType;
      };
    };
  };
  "/business/:business_id/clients": {
    path: `/business/${string}/clients`;
    methods: {
      GET: {
        query: undefined;
        body: undefined;
        response: UserPayloadType[];
      };
    };
  };
  "/business/:business_id/hours": {
    path: `/business/${string}/hours`;
    methods: {
      GET: {
        query: undefined;
        body: undefined;
        response: BusinessType;
      };
      PUT: {
        query: undefined;
        body: { hours: BusinessHoursType };
        response: BusinessType;
      };
    };
  };
}
