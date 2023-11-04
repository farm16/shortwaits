type HttpMethod = "POST" | "GET" | "PUT" | "DELETE";

type Endpoint =
  | "auth/admin/local/sign-in"
  | "auth/admin/local/sign-out"
  | "auth/admin/local/sign-up"
  | "auth/admin/local/forgot-password"
  | "auth/admin/local/refresh"
  | "auth/admin/social/sign-up"
  | "auth/admin/social/sign-in"
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
  | "business/register"
  | "shortwaits/admin/mobile"
  | `events/business/summary/${string}`
  | `events/business/${string}`
  | "events/people"
  | `events/${string}`
  | "events"
  | `events/delete/${string}`
  | "events/delete"
  | "services"
  | `services/${string}`
  | "business-user/multiple"
  | "upload-file/image"
  | `local-client-user/${string}`;

export const createEndpoint = <T = any>(endpoint: Endpoint, method: HttpMethod) => {
  return {
    getConfig: (pathVars: string[], queryParams: T) => {
      const url = endpoint
        .split("/")
        .map(part => (part.startsWith(":") ? pathVars.shift() : part))
        .join("/");

      const queryString = queryParams ? new URLSearchParams(queryParams ?? {}).toString() : undefined;
      const urlWithQuery = queryString ? `${url}?${queryString}` : url;
      if (process.env["NODE_ENV"] !== "production") {
        console.log(`${method} - ${urlWithQuery}`);
      }

      return {
        method,
        url: urlWithQuery,
      };
    },
  };
};

export const endpoints = {
  // auth
  signInLocal: createEndpoint("auth/admin/local/sign-in", "POST"),
  signOutLocal: createEndpoint("auth/admin/local/sign-out", "POST"),
  signUpLocal: createEndpoint("auth/admin/local/sign-up", "POST"),
  signUpSocial: createEndpoint("auth/admin/social/sign-up", "POST"),
  signInSocial: createEndpoint("auth/admin/social/sign-in", "POST"),
  forgotPasswordLocal: createEndpoint("auth/admin/local/forgot-password", "POST"),
  refreshLocal: createEndpoint("auth/admin/local/refresh", "PUT"),

  // auth client
  signInClientLocal: createEndpoint("auth/client/local/sign-in", "POST"),
  signOutClientLocal: createEndpoint("auth/client/local/sign-out", "POST"),
  signUpClientLocal: createEndpoint("auth/client/local/sign-up", "POST"),
  signUpClientSocial: createEndpoint("auth/client/social/sign-up", "POST"),
  signInClientSocial: createEndpoint("auth/client/social/sign-in", "POST"),
  forgotPasswordClientLocal: createEndpoint("auth/client/local/forgot-password", "POST"),
  refreshClientLocal: createEndpoint("auth/client/local/refresh", "PUT"),

  // business
  getBusiness: createEndpoint(`business/:businessId`, "GET"),
  updateBusiness: createEndpoint(`business/:businessId`, "PUT"),
  getBusinessAdmins: createEndpoint(`business/:businessId/admins`, "GET"),
  getBusinessServices: createEndpoint(`business/:businessId/services`, "GET"),
  getBusinessCategories: createEndpoint(`business/:businessId/categories`, "GET"),
  getBusinessHours: createEndpoint(`business/:businessId/hours`, "GET"),
  getBusinessEvents: createEndpoint(`business/:businessId/events`, "GET"),
  getBusinessClients: createEndpoint(`business/:businessId/clients`, "GET"),
  getBusinessLocalClients: createEndpoint(`local-client-user/business/:businessId`, "GET"),
  getBusinessStaff: createEndpoint(`business/:businessId/staff`, "GET"),
  registerBusiness: createEndpoint("business/register", "POST"),
  //business User === Staff
  //client User === Client
  createBusinessStaff: createEndpoint(`business/:businessId/staff`, "POST"),
  updateBusinessStaff: createEndpoint(`business/:businessId/staff`, "PUT"),
  createBusinessClient: createEndpoint(`business/:businessId/clients`, "POST"),
  updateBusinessClient: createEndpoint(`business/:businessId/clients`, "PUT"),

  // Users this includes both staff and client users
  getBusinessUsers: createEndpoint("business-user/multiple", "POST"),

  // shortwaits
  getShortwaitsAdminMobile: createEndpoint("shortwaits/admin/mobile", "GET"),

  //events
  getEventsBusinessSummary: createEndpoint(`events/business/summary/:businessId`, "GET"),
  getEventsForBusiness: createEndpoint<{
    page?: number;
    limit?: number;
    date?: string;
    filterBy?: string;
  }>(`events/business/:businessId`, "GET"),
  createEventForBusiness: createEndpoint(`events/business/:businessId`, "POST"),
  getEvents: createEndpoint("events", "GET"),
  getEvent: createEndpoint(`events/:eventId`, "GET"),
  updateEvents: createEndpoint(`events/business/:businessId`, "PUT"),
  deleteEvent: createEndpoint(`events/delete/:eventId`, "PUT"),
  deleteEvents: createEndpoint("events/delete", "PUT"),
  getPeopleInEvent: createEndpoint<{
    eventId: string;
  }>(`events/people`, "GET"),

  //services
  getService: createEndpoint<{
    serviceId: string;
  }>("services", "GET"),
  getServices: createEndpoint<{
    businessId: string;
  }>("services", "GET"),
  updateService: createEndpoint(`services/:businessId`, "PUT"),
  createService: createEndpoint(`services/:businessId`, "POST"),
  deleteService: createEndpoint<{
    businessId: string;
  }>(`services/:serviceId`, "DELETE"),

  // upload file
  uploadImageFile: createEndpoint("upload-file/image", "POST"),
};
