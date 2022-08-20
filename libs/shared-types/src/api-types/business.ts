import { BusinessHoursType, BusinessType } from "..";

import { DocType, SuccessResponseType } from ".";

export type BusinessSuccessResponseType =
  SuccessResponseType<BusinessPayloadType>;

export type BusinessPayloadType = DocType<BusinessType>;

export type BusinessSuccessFnType = (
  payload: BusinessPayloadType,
  message: string
) => BusinessSuccessResponseType;

export interface BusinessEndpointsTypes {
  "business/": {
    methods: {
      POST: {
        params: undefined;
        body: {
          country: string;
          phone1: string;
          shortName: string;
          longName: string;
          description: string;
          isRegistrationCompleted: boolean;
          staff: [];
          categories: [];
          services: [];
        };
        return: BusinessType;
      };
    };
  };
  "business/:business_id": {
    methods: {
      GET: {
        params: ["business_id"];
        body: undefined;
        return: BusinessType;
      };
    };
  };
  "business/:business_id/admins": {
    methods: {
      GET: {
        params: ["business_id"];
        body: undefined;
        return: BusinessType;
      };
    };
  };
  "business/:business_id/services": {
    methods: {
      GET: {
        params: ["business_id"];
        body: undefined;
        return: BusinessType;
      };
    };
  };
  "business/:business_id/categories": {
    methods: {
      GET: {
        params: ["business_id"];
        body: undefined;
        return: BusinessType;
      };
    };
  };
  "business/:business_id/staff": {
    methods: {
      GET: {
        params: ["business_id"];
        body: undefined;
        return: BusinessType;
      };
    };
  };
  "business/:business_id/hours": {
    methods: {
      GET: {
        params: ["business_id"];
        body: undefined;
        return: BusinessType;
      };
      PUT: {
        params: ["business_id"];
        body: { hours: BusinessHoursType };
        return: BusinessType;
      };
    };
  };
  "business/registration": {
    methods: {
      GET: {
        params: ["business_id"];
        body: undefined;
        return: BusinessType;
      };
    };
  };
}
