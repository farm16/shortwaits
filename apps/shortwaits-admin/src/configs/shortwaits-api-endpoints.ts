import {
  BusinessEndpointsMethods,
  BusinessEndpointsPaths,
} from "@shortwaits/shared-types";
import ENV from "react-native-config";

type BusinessEndpoint = Record<
  string,
  {
    getPath(business_id: string): BusinessEndpointsPaths;
    METHOD: BusinessEndpointsMethods;
  }
>;

export const API_BASE_URL = ENV.API_BASE_URL;

console.log("API_BASE_URL >>>", API_BASE_URL);

export const shortwaitsApiEndpoints = {
  AUTH: {
    adminLocalSignUp: {
      PATH: "/auth/admin/local/sign-up",
      METHOD: "POST",
    },
    adminLocalSignIn: {
      PATH: "/auth/admin/local/sign-in",
      METHOD: "POST",
    },
    adminLocalSignOut: {
      PATH: "/auth/admin/local/sign-out",
      METHOD: "POST",
    },
    signOut: {
      PATH: "/auth/sign-out",
      METHOD: "POST",
    },
    refreshToken: {
      PATH: "/auth/refresh",
      METHOD: "POST",
    },
  },
  USERS: {
    getUser: {
      PATH: "/users",
      METHOD: "GET",
    },
    putUser: {
      PATH: "/users",
      METHOD: "PUT",
    },
    deleteUser: {
      PATH: "/users",
      METHOD: "DELETE",
    },
    postUser: {
      PATH: "/users",
      METHOD: "POST",
    },
  },
  BUSINESS: {
    getBusiness: {
      getPath: (_id: string) => `/business/${_id}`,
      METHOD: "GET",
    },
    updateBusiness: {
      getPath: (_id: string) => `/business`,
      METHOD: "PUT",
    },
    getBusinessServices: {
      getPath: (_id: string) => `/business/${_id}/services`,
      METHOD: "GET",
    },
    getBusinessCategories: {
      getPath: (_id: string) => `/business/${_id}/categories`,
      METHOD: "GET",
    },
    getBusinessStaff: {
      getPath: (_id: string) => `/business/${_id}/staff`,
      METHOD: "GET",
    },
    getBusinessHours: {
      getPath: (_id: string) => `/business/${_id}/hours`,
      METHOD: "GET",
    },
    updateBusinessHours: {
      getPath: (_id: string) => `/business/${_id}/hours`,
      METHOD: "PUT",
    },
    registerBusiness: {
      getPath: (_id: string) => `/business/register`,
      METHOD: "PUT",
    },
    createBusinessUser: {
      getPath: (_id: string) => `/business/${_id}/staff`,
      METHOD: "POST",
    },
    createBusinessClient: {
      getPath: (_id: string) => `/business/${_id}/clients`,
      METHOD: "POST",
    },
    getBusinessClients: {
      getPath: (_id: string) => `/business/${_id}/clients`,
      METHOD: "GET",
    },
  } as BusinessEndpoint,
  CATEGORIES: {
    getCategories: {
      getPath: () => `/categories`,
      METHOD: "GET",
    },
    getCategory: {
      getPath: (categoryId: string) => `/category?category_id=${categoryId}`,
      METHOD: "GET",
    },
  },
  SERVICES: {
    postServices: {
      getPath: (serviceId: string) => `/services?serviceId=${serviceId}`,
      METHOD: "POST",
    },
    getService: {
      getPath: (serviceId: string) => `/services?serviceId=${serviceId}`,
      METHOD: "GET",
    },
    getServices: {
      getPath: () => "/services",
      METHOD: "GET",
    },
    getBusinessServices: {
      getPath: (businessId: string) => `/services?businessId=${businessId}`,
      METHOD: "GET",
    },
    // updateService: {
    //   getPath: (businessId: string) => `/business/${businessId}/hours`,
    //   METHOD: "PUT",
    // },
    // patchService: {
    //   getPath: (businessId: string) => `/business/${businessId}/hours`,
    //   METHOD: "PATCH",
    // },
    // deleteService: {
    //   getPath: (businessId: string) => `/business/${businessId}/hours`,
    //   METHOD: "DELETE",
    // },
  },
  EVENTS: {
    postEvent: {
      METHOD: "POST",
      getPath: (businessId: string) => `/events/admin/${businessId}`,
    },
    getAllAdminEvents: {
      METHOD: "GET",
      getPath: (businessId: string) => `/events/admin/${businessId}`,
    },
  },

  SHORTWAITS: {
    getAdminMobile: { PATH: "/shortwaits/admin/mobile", METHOD: "GET" },
  },
} as const;
