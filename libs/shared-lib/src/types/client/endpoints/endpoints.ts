import { HttpMethod } from "../../common";

type Endpoint =
  | "auth/business/sign-in/local-auth"
  | "auth/business/sign-out/local-auth"
  | "auth/business/sign-up/local-auth"
  | "auth/admin/local/forgot-password"
  | "auth/business/refresh-token/local-auth"
  | "auth/business/sign-up/social"
  | "auth/business/sign-in/social"
  | "auth/client/local/sign-in"
  | "auth/client/local/sign-out"
  | "auth/client/local/sign-up"
  | "auth/client/local/forgot-password"
  | "auth/client/local/refresh"
  | "auth/client/social/sign-up"
  | "auth/client/social/sign-in"
  | `business/${string}`
  | `business/${string}/admins`
  | `business/${string}/services`
  | `business/${string}/categories`
  | `business/${string}/hours`
  | `business/${string}/events`
  | `business/${string}/clients`
  | `business/${string}/staff`
  | "business/registration/complete"
  | "categories"
  | "categories/:categoryId"
  | "shortwaits/admin/mobile"
  | "shortwaits/client/mobile" // todo: add this
  | "shortwaits/client/web" // todo: add this
  | `business-events/summary/${string}`
  | `business-events/${string}`
  | "business-events/people"
  | "services"
  | `services/${string}`
  | "business-user/multiple"
  | "upload-file/image"
  | `clients`
  | `clients/${string}`
  | `clients/business/${string}`
  | `clients/business/${string}/clients`
  | `business-user`
  | `business-user/business/${string}`
  | `local-clients/${string}`
  | `local-clients/business/${string}`
  | `client-events/event/${string}`
  | `client-events/register/${string}`
  | `client-events/withdraw/${string}`
  | `client-events/details/event/${string}`
  | `client-events/details/events`
  | `client-events/details/service/${string}`
  | `client-events/details/services/${string}`;

type QueryConfigParams<T> = {
  pathVars?: string[];
  queryParams?: T;
};
type MutationConfigParams<T> = {
  pathVars?: string[];
  queryParams?: T;
  body: any;
};
export const createEndpoint = <T = any>(endpoint: Endpoint, method: HttpMethod) => {
  return {
    /**
     *
     * @deprecated use getQueryConfig or getMutationConfig instead
     */
    getConfig: (pathVars: string[] = [], queryParams: T = {} as T, body = {}) => {
      const url = endpoint
        .split("/")
        .map(part => (part.startsWith(":") ? pathVars.shift() : part))
        .join("/");

      const queryString = queryParams ? new URLSearchParams(queryParams ?? {}).toString() : null;
      const urlWithQuery = queryString ? `${url}?${queryString}` : url;
      console.log(`${method} - ${urlWithQuery}`);
      return {
        method,
        url: urlWithQuery,
        body,
      };
    },
    getQueryConfig: (params?: QueryConfigParams<T>) => {
      const { pathVars = [], queryParams = {} } = params ?? {
        pathVars: [],
        queryParams: {},
      };
      const url = endpoint
        .split("/")
        .map(part => (part.startsWith(":") ? pathVars.shift() : part))
        .join("/");

      const queryString = queryParams ? new URLSearchParams(queryParams ?? {}).toString() : null;
      const urlWithQuery = queryString ? `${url}?${queryString}` : url;

      console.log(`${method} - ${urlWithQuery}`);
      return urlWithQuery;
    },
    getMutationConfig: (params?: MutationConfigParams<T>) => {
      const {
        pathVars = [],
        queryParams = {},
        body,
      } = params ?? {
        pathVars: [],
        queryParams: {},
      };
      const url = endpoint
        .split("/")
        .map(part => (part.startsWith(":") ? pathVars.shift() : part))
        .join("/");

      const queryString = queryParams ? new URLSearchParams(queryParams ?? {}).toString() : null;
      const urlWithQuery = queryString ? `${url}?${queryString}` : url;
      console.log(`${method} - ${urlWithQuery}`);
      return {
        method,
        url: urlWithQuery,
        body,
      };
    },
  };
};

export const endpoints = {
  // auth
  signInLocal: createEndpoint("auth/business/sign-in/local-auth", "POST"),
  signOutLocal: createEndpoint("auth/business/sign-out/local-auth", "POST"),
  signUpLocal: createEndpoint("auth/business/sign-up/local-auth", "POST"),
  signUpSocial: createEndpoint("auth/business/sign-up/social", "POST"),
  signInSocial: createEndpoint("auth/business/sign-in/social", "POST"),
  forgotPasswordLocal: createEndpoint("auth/admin/local/forgot-password", "POST"),
  refreshLocal: createEndpoint("auth/business/refresh-token/local-auth", "POST"),

  // auth client
  signInClientLocal: createEndpoint("auth/client/local/sign-in", "POST"),
  signOutClientLocal: createEndpoint("auth/client/local/sign-out", "POST"),
  signUpClientLocal: createEndpoint("auth/client/local/sign-up", "POST"),
  signUpClientSocial: createEndpoint("auth/client/social/sign-up", "POST"),
  signInClientSocial: createEndpoint("auth/client/social/sign-in", "POST"),
  forgotPasswordClientLocal: createEndpoint("auth/client/local/forgot-password", "POST"),
  refreshClientLocal: createEndpoint("auth/client/local/refresh", "PUT"),

  // business
  getBusiness: createEndpoint("business/:businessId", "GET"),
  updateBusiness: createEndpoint("business/:businessId", "PUT"),
  getBusinessAdmins: createEndpoint("business/:businessId/admins", "GET"),
  getBusinessServices: createEndpoint("business/:businessId/services", "GET"),
  getBusinessCategories: createEndpoint("business/:businessId/categories", "GET"),
  getBusinessHours: createEndpoint("business/:businessId/hours", "GET"),
  getAllBusinessClients: createEndpoint("business/:businessId/all-clients", "GET"),
  createBusinessLocalClients: createEndpoint("business/:businessId/local-clients", "POST"),
  deleteBusinessLocalClients: createEndpoint("business/:businessId/local-clients", "DELETE"),
  updateBusinessLocalClient: createEndpoint("business/:businessId/local-client", "PUT"),
  getBusinessUser: createEndpoint("business/:businessId/user", "GET"),
  createBusinessUser: createEndpoint("business/:businessId/user", "POST"),
  updateBusinessUser: createEndpoint("business/:businessId/user", "PUT"),
  deleteBusinessUser: createEndpoint("business/:businessId/user", "DELETE"),
  registerBusiness: createEndpoint("business/registration/complete", "POST"),

  // categories
  getCategories: createEndpoint("categories", "GET"),
  getCategory: createEndpoint("categories/:categoryId", "GET"),

  // shortwaits
  getShortwaitsAdminMobile: createEndpoint("shortwaits/admin/mobile", "GET"),

  //business-events
  getBusinessEventsSummary: createEndpoint("business-events/summary/:businessId", "GET"),
  getBusinessEvents: createEndpoint<PaginationQuery>("business-events/:businessId", "GET"),
  createBusinessEvent: createEndpoint("business-events/:businessId", "POST"),
  updateBusinessEvent: createEndpoint("business-events/:businessId", "PUT"),
  getBusinessEventPeople: createEndpoint<EventIdQuery>("business-events/people", "GET"),
  updateClientsInBusinessEvent: createEndpoint("business-events/clients", "POST"),
  updateBusinessEventStatus: createEndpoint("business-events/status/:eventId", "PUT"),

  //client-events
  withdrawEventForClient: createEndpoint("client-events/withdraw/:eventId", "PUT"),
  registerEventByIdForClient: createEndpoint("client-events/register/:eventId", "PUT"),
  getEventDetailsForClient: createEndpoint("client-events/details/event/:eventId", "GET"),
  getEventsDetailsForClient: createEndpoint("client-events/details/events", "GET"),
  getServiceByIdForClient: createEndpoint("client-events/details/service/:serviceId", "GET"),
  getServicesByBusinessIdsForClient: createEndpoint("client-events/details/services/:businessId", "GET"),

  //services
  getService: createEndpoint<ServiceIdQuery>("services", "GET"),
  getServices: createEndpoint<BusinessIdQuery>("services", "GET"),
  updateService: createEndpoint("services/:businessId", "PUT"),
  createService: createEndpoint("services/:businessId", "POST"),
  deleteService: createEndpoint("services/:businessId", "DELETE"),

  // Clients
  getBusinessClients: createEndpoint("clients/business/:businessId", "GET"),
  addClientToBusiness: createEndpoint("clients/business/:businessId/client", "PUT"),

  // Local Clients
  getBusinessLocalClients: createEndpoint("local-clients/business/:businessId", "GET"),
  addBusinessLocalClient: createEndpoint("local-clients/business/:businessId", "POST"),

  // business user (staff, admin, super admin)
  getStaffUsers: createEndpoint("business-user/business/:businessId", "GET"),

  // upload file
  uploadImageFile: createEndpoint("upload-file/image", "POST"),
};

type BusinessIdQuery = {
  businessId: string;
};

type ServiceIdQuery = {
  serviceId: string;
};
type EventIdQuery = {
  eventId: string;
};
type PaginationQuery = {
  page?: number;
  limit?: number;
  date?: string;
  filterBy?: string;
};
