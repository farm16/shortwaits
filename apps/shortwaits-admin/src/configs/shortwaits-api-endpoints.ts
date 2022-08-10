import ENV from "react-native-config";

export const shortwaitsApiEndpoints = {
  API_BASE_URL: ENV.API_BASE_URL,
  AUTH: {
    adminLocalSignUp: { PATH: "/auth/admin/local/sign-up", METHOD: "POST" },
    adminLocalSignIn: { PATH: "/auth/admin/local/sign-in", METHOD: "POST" },
    adminLocalSignOut: { PATH: "/auth/admin/local/sign-out", METHOD: "POST" },
    signOut: { PATH: "/auth/sign-out", METHOD: "POST" },
    refreshToken: { PATH: "/auth/refresh", METHOD: "POST" },
  },
  USERS: {
    getUser: { PATH: "/users", METHOD: "GET" },
    putUser: { PATH: "/users", METHOD: "PUT" },
    deleteUser: { PATH: "/users", METHOD: "DELETE" },
    postUser: { PATH: "/users", METHOD: "POST" },
  },
  BUSINESS: {
    getBusiness: {
      getPath: (_id: string) => `/business/${_id}`,
      PATH: "/business",
      METHOD: "GET",
    },
    patchBusiness: {
      getPath: (_id: string) => `/business/${_id}`,
      PATH: "/business",
      METHOD: "PATCH",
    },
    updateBusiness: {
      getPath: (_id: string) => `/business/${_id}`,
      PATH: "/business",
      METHOD: "PUT",
    },
    deleteBusiness: {
      getPath: (_id: string) => `/business/${_id}`,
      PATH: "/business",
      METHOD: "DELETE",
    },
    createBusiness: {
      getPath: (_id: string) => `/business/${_id}`,
      PATH: "/business",
      METHOD: "POST",
    },
    registerBusiness: {
      getPath: () => "/business/registration",
      PATH: "/business/registration",
      METHOD: "POST",
    },
    getBusinessServices: {
      getPath: (_id: string) => `/business/${_id}/services`,
      PATH: "/business/services",
      METHOD: "GET",
    },
    getBusinessCategories: {
      getPath: (_id: string) => `/business/${_id}/categories`,
      PATH: "/business/categories",
      METHOD: "GET",
    },
    getBusinessStaff: {
      getPath: (_id: string) => `/business/${_id}/staff`,
      PATH: "/business/staff",
      METHOD: "GET",
    },
    getBusinessHours: {
      getPath: (_id: string) => `/business/${_id}/hours`,
      PATH: "/business/hours",
      METHOD: "GET",
    },
  },
  CATEGORIES: {
    getAllCategories: { PATH: "/categories", METHOD: "GET" },
    getCategory: { PATH: "/categories", METHOD: "GET" },
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
    updateService: {
      getPath: (_id: string) => `/business/${_id}/hours`,
      METHOD: "PUT",
    },
    patchService: {
      getPath: (_id: string) => `/business/${_id}/hours`,
      METHOD: "PATCH",
    },
    deleteService: {
      getPath: (_id: string) => `/business/${_id}/hours`,
      METHOD: "DELETE",
    },
  },
  SHORTWAITS: {
    getAdminMobile: { PATH: "/shortwaits/admin/mobile", METHOD: "GET" },
  },
} as const;
