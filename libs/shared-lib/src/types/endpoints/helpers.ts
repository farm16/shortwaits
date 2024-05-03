import { ObjectId } from "../common";

export type ApiResponseWithPayload<Payload> = {
  status: "success" | "error" | "pending";
  success: boolean;
  data: Payload;
  messages?: string[];
};

export type RegisterWithEmailRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

export type DocType<T = never> = T & {
  _id: ObjectId;
};

export type SuccessResponseType<Payload = never> = {
  status: "success" | "pending";
  success: boolean;
  message: string;
  data: Payload;
};
export type SuccessResponseFnType<Payload = never> = (payload: Payload, status: "success" | "pending", message: string) => SuccessResponseType<Payload>;

export type ErrorResponseFnType = (code: ErrorCodeType, message: string, errors: ErrorsWithCodeType[]) => ErrorResponseType;

export type ErrorResponseType = ErrorsWithCodeType & {
  status: "error";
  success: false;
  errors: ErrorsWithCodeType[];
};

export type ErrorsWithCodeType = {
  code: ErrorCodeType;
  message?: string;
};
export type ErrorCodeType = keyof typeof ERROR_CODES;

export const ERROR_CODES = {
  11: { code: 11, description: "business categories error" },
  12: { code: 12, description: "business services error" },
  13: { code: 13, description: "users services error" },
  131: { code: 131, description: "users controller error" },
  14: { code: 14, description: "my business controller error" },
  15: { code: 15, description: "shortwaits default data controller error" },
  16: { code: 16, description: "server error," },
  20: { code: 20, description: "validation error" },
  21: { code: 21, description: "authorization error" },
  23: { code: 23, description: "mongo error" },
  25: { code: 25, description: "console log error" },
  26: { code: 26, description: "authorization error sign in" },
  27: { code: 27, description: "authorization error sign out" },
  28: { code: 28, description: "authorization error signup" },
} as const;

export interface CommonResponseType<DataPayload = unknown, MetaPayload = unknown> {
  statusCode: number;
  data: DataPayload;
  message?: string;
  meta?: MetaPayload;
  errorCode?: ErrorCodeType;
}

export type HttpMethod = "GET" | "DELETE" | "PUT" | "POST" | "PATCH";

export type ApiMetaType = {
  count?: number;
  page?: number;
};

export type CommonQuery = {
  limit?: number;
  page?: number;
};

export type EndpointProps = {
  path: string;
  methods: {
    [M in HttpMethod]?: {
      query?: CommonQuery;
      params?: unknown;
      body?: unknown;
      response: CommonResponseType;
    };
  };
};

export type GeneralSpecShape = {
  [x in EndPoints]?: EndpointProps;
};

export type EndPoints = BusinessEndPoints | EventsEndPoints;

export type EventsEndPoints = "/events/{eventId}" | "/events/user/{userId}" | "/events/business/{businessId}" | "/events";

export type BusinessEndPoints =
  | "/business"
  | "/business/{businessId}"
  | "/business/{businessId}/admins"
  | "/business/{businessId}/services"
  | "/business/{businessId}/categories"
  | "/business/{businessId}/hours"
  | "/business/{businessId}/events"
  | "/business/{businessId}/clients"
  | "/business/{businessId}/staff"
  | "/business/register";
