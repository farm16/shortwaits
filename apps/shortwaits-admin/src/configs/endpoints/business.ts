import {
  BusinessEndpointsMethods,
  BusinessEndpointsPaths,
} from "@shortwaits/shared-types";

const BUSINESS_BASE_PATH = "/business";

type BusinessEndpoint = {
  [x: string]: {
    getPath(id?: string): BusinessEndpointsPaths;
    METHOD: BusinessEndpointsMethods;
  };
};

export const BUSINESS: BusinessEndpoint = {
  getBusiness: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}`,
    METHOD: "GET",
  },
  updateBusiness: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}`,
    METHOD: "PUT",
  },
  getBusinessServices: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/services`,
    METHOD: "GET",
  },
  getBusinessCategories: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/categories`,
    METHOD: "GET",
  },
  getBusinessStaff: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/staff`,
    METHOD: "GET",
  },
  getBusinessHours: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/hours`,
    METHOD: "GET",
  },
  updateBusinessHours: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/hours`,
    METHOD: "PUT",
  },
  registerBusiness: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/register`,
    METHOD: "PUT",
  },
  createBusinessUser: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/staff`,
    METHOD: "POST",
  },
  createBusinessClient: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/clients`,
    METHOD: "POST",
  },
  getBusinessClients: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/clients`,
    METHOD: "GET",
  },
};
