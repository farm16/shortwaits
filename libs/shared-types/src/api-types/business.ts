import { BusinessType, ClientUserType } from '..';
import {
  CommonResponseType,
  DocType,
  GeneralSpecShape,
  ServicesPayloadType,
  SuccessResponseType,
  UserPayloadType,
} from '.';

export type BusinessPayloadType = DocType<BusinessType>;
export type BusinessSuccessResponseType =
  SuccessResponseType<BusinessPayloadType>;
export type BusinessSuccessFnType = (
  payload: BusinessPayloadType,
  message: string
) => BusinessSuccessResponseType;

type EndpointPath =
  | '/business'
  | '/business/register'
  | `/business/:business_id`
  | `/business/:business_id/admins`
  | `/business/:business_id/services`
  | `/business/:business_id/categories`
  | `/business/:business_id/staff`
  | `/business/:business_id/clients`
  | `/business/:business_id/hours`;

export type BusinessEndpointsPaths =
  BusinessEndpointsTypes[EndpointPath]['path'];
export type BusinessEndpointsMethods =
  keyof BusinessEndpointsTypes[EndpointPath]['methods'];

type MethodType<T, Q = undefined, B = undefined> = {
  query: Q;
  body: B;
  response: CommonResponseType<T>;
};

export interface BusinessEndpointsTypes extends GeneralSpecShape {
  '/business': {
    path: `/business`;
    methods: {
      PUT: MethodType<BusinessPayloadType>;
    };
  };
  '/business/register': {
    path: `/business/register`;
    methods: {
      PUT: MethodType<BusinessPayloadType>;
    };
  };
  '/business/:business_id': {
    path: `/business/${string}`;
    methods: {
      GET: MethodType<BusinessType>;
    };
  };
  '/business/:business_id/admins': {
    path: `/business/${string}/admin`;
    methods: {
      GET: MethodType<BusinessType>;
    };
  };
  '/business/:business_id/services': {
    path: `/business/${string}/services`;
    methods: {
      GET: MethodType<ServicesPayloadType>;
      PUT: MethodType<ServicesPayloadType>;
      POST: MethodType<ServicesPayloadType>;
    };
  };
  '/business/:business_id/categories': {
    path: `/business/${string}/categories`;
    methods: {
      GET: MethodType<BusinessType>;
    };
  };
  '/business/:business_id/staff': {
    path: `/business/${string}/staff`;
    methods: {
      GET: MethodType<UserPayloadType[]>;
      POST: MethodType<UserPayloadType[]>;
    };
  };
  '/business/:business_id/clients': {
    path: `/business/${string}/clients`;
    methods: {
      GET: MethodType<UserPayloadType[]>;
      POST: MethodType<Partial<ClientUserType>[]>;
    };
  };
  '/business/:business_id/hours': {
    path: `/business/${string}/hours`;
    methods: {
      GET: MethodType<BusinessType>;
      PUT: MethodType<BusinessType>;
    };
  };
}
