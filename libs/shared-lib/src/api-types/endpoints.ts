type HttpMethod = "POST" | "GET" | "PUT" | "DELETE";

type Endpoint =
  | "auth/admin/local/sign-in"
  | "auth/admin/local/sign-out"
  | "auth/admin/local/sign-up"
  | "auth/admin/local/forgot-password"
  | "auth/admin/local/refresh"
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
  | `events/${string}`
  | "events"
  | `events/delete/${string}`
  | "events/delete"
  | "services"
  | `services/${string}`;

export const createEndpoint = <T = any>(
  endpoint: Endpoint,
  method: HttpMethod
) => {
  return {
    getConfig: (pathVars: string[], queryParams: T) => {
      const url = endpoint
        .split("/")
        .map(part => (part.startsWith(":") ? pathVars.shift() : part))
        .join("/");

      const queryString = queryParams
        ? new URLSearchParams(queryParams ?? {}).toString()
        : undefined;
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
  forgotPasswordLocal: createEndpoint(
    "auth/admin/local/forgot-password",
    "POST"
  ),
  refreshLocal: createEndpoint("auth/admin/local/refresh", "PUT"),

  // business
  getBusiness: createEndpoint(`business/:businessId`, "GET"),
  updateBusiness: createEndpoint(`business/:businessId`, "PUT"),
  getBusinessAdmins: createEndpoint(`business/:businessId/admins`, "GET"),
  getBusinessServices: createEndpoint(`business/:businessId/services`, "GET"),
  getBusinessCategories: createEndpoint(
    `business/:businessId/categories`,
    "GET"
  ),
  getBusinessHours: createEndpoint(`business/:businessId/hours`, "GET"),
  getBusinessEvents: createEndpoint(`business/:businessId/events`, "GET"),
  getBusinessClients: createEndpoint(`business/:businessId/clients`, "GET"),
  getBusinessStaff: createEndpoint(`business/:businessId/staff`, "GET"),
  registerBusiness: createEndpoint("business/register", "POST"),

  // shortwaits
  getShortwaitsAdminMobile: createEndpoint("shortwaits/admin/mobile", "GET"),

  //events
  getEventsBusinessSummary: createEndpoint(
    `events/business/summary/:businessId`,
    "GET"
  ),
  getEventsForBusiness: createEndpoint<{
    page?: number;
    limit?: number;
    date?: string;
    filterBy?: string;
  }>(`events/business/:businessId`, "GET"),
  createEventForBusiness: createEndpoint(`events/business/:businessId`, "POST"),
  getEvents: createEndpoint("events", "GET"),
  getEvent: createEndpoint(`events/:eventId`, "GET"),
  updateEvents: createEndpoint(`events/:eventId`, "PUT"),
  deleteEvent: createEndpoint(`events/delete/:eventId`, "PUT"),
  deleteEvents: createEndpoint("events/delete", "PUT"),

  //services
  getServices: createEndpoint("services", "GET"),
  getService: createEndpoint(`services/:serviceId`, "GET"),
};
