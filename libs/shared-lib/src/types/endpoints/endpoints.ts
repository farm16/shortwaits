type HttpMethod = "POST" | "GET" | "PUT" | "DELETE";

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
  | "shortwaits/admin/mobile"
  | "shortwaits/client/mobile" // todo: add this
  | "shortwaits/client/web" // todo: add this
  | `events/business/summary/${string}`
  | `events/business/${string}`
  | "events/business/people"
  | `events/${string}`
  | "events"
  | `events/delete/${string}`
  | "events/delete"
  | "services"
  | `services/${string}`
  | "business-user/multiple"
  | "upload-file/image"
  // users endpoints
  | `client-user`
  | `client-user/${string}`
  | `client-user/business/${string}`
  | `client-user/business/${string}/clients`
  | `business-staff`
  | `business-staff/business/${string}`
  | `local-client-user/${string}`
  | `local-client-user/business/${string}`
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
  getBusinessEvents: createEndpoint("business/:businessId/events", "GET"),
  getAllBusinessClients: createEndpoint("business/:businessId/clients", "GET"),
  createBusinessLocalClient: createEndpoint("business/:businessId/local-clients", "POST"),
  updateBusinessLocalClient: createEndpoint("business/:businessId/local-client", "PUT"),
  getBusinessStaff: createEndpoint("business/:businessId/staff", "GET"),
  createBusinessStaff: createEndpoint("business/:businessId/staff", "POST"),
  updateBusinessStaff: createEndpoint("business/:businessId/staff", "PUT"),
  registerBusiness: createEndpoint("business/registration/complete", "POST"),

  // shortwaits
  getShortwaitsAdminMobile: createEndpoint("shortwaits/admin/mobile", "GET"),

  //events
  getEventsBusinessSummary: createEndpoint(`events/business/summary/:businessId`, "GET"),
  getEventsForBusiness: createEndpoint<PaginationQuery>(`events/business/:businessId`, "GET"),
  createEventForBusiness: createEndpoint(`events/business/:businessId`, "POST"),
  getEvents: createEndpoint("events", "GET"),
  getEvent: createEndpoint(`events/:eventId`, "GET"),
  updateEvents: createEndpoint(`events/business/:businessId`, "PUT"),
  deleteEvent: createEndpoint(`events/delete/:eventId`, "PUT"),
  deleteEvents: createEndpoint("events/delete", "PUT"),
  getPeopleInEvent: createEndpoint<EventIdQuery>("events/business/people", "GET"),

  //client-events
  withdrawEventForClient: createEndpoint(`client-events/withdraw/:eventId`, "PUT"),
  registerEventByIdForClient: createEndpoint(`client-events/register/:eventId`, "PUT"),

  getEventDetailsForClient: createEndpoint(`client-events/details/event/:eventId`, "GET"),
  getEventsDetailsForClient: createEndpoint(`client-events/details/events`, "GET"),
  getServiceByIdForClient: createEndpoint(`client-events/details/service/:serviceId`, "GET"),
  getServicesByBusinessIdsForClient: createEndpoint(`client-events/details/services/:businessId`, "GET"),

  //services
  getService: createEndpoint<ServiceIdQuery>("services", "GET"),
  getServices: createEndpoint<BusinessIdQuery>("services", "GET"),
  updateService: createEndpoint(`services/:businessId`, "PUT"),
  createService: createEndpoint(`services/:businessId`, "POST"),
  deleteService: createEndpoint<BusinessIdQuery>(`services/:serviceId`, "DELETE"),

  // Client Users
  getClientUsers: createEndpoint("client-user/business/:businessId", "GET"),
  addClientUsers: createEndpoint("client-user/business/:businessId", "POST"),
  updateClientUsers: createEndpoint("client-user/business/:businessId", "PUT"),
  addClientToBusiness: createEndpoint("client-user/business/:businessId/local-clients", "PUT"),
  getClientUser: createEndpoint("client-user/:clientShortId", "GET"),

  // Local Client Users
  getLocalClientUsers: createEndpoint("local-client-user/business/:businessId", "GET"),
  addLocalClientUser: createEndpoint("local-client-user/business/:businessId", "POST"),
  updateLocalClientUsers: createEndpoint(`local-client-user/business/:businessId`, "PUT"),

  // business staff
  getStaffUsers: createEndpoint(`business-staff/business/:businessId`, "GET"),

  // upload file
  uploadImageFile: createEndpoint("upload-file/image", "POST"),
};

type BusinessIdQuery = {
  businessId: string;
};
type ClientIdQuery = {
  clientId: string;
};
type StaffIdQuery = {
  staffId: string;
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
