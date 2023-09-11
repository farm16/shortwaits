import { ObjectId } from "../common-types";
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
export declare const ERROR_CODES: {
    readonly 11: {
        readonly code: 11;
        readonly description: "business categories error";
    };
    readonly 12: {
        readonly code: 12;
        readonly description: "business services error";
    };
    readonly 13: {
        readonly code: 13;
        readonly description: "users services error";
    };
    readonly 131: {
        readonly code: 131;
        readonly description: "users controller error";
    };
    readonly 14: {
        readonly code: 14;
        readonly description: "my business controller error";
    };
    readonly 15: {
        readonly code: 15;
        readonly description: "shortwaits default data controller error";
    };
    readonly 16: {
        readonly code: 16;
        readonly description: "server error,";
    };
    readonly 20: {
        readonly code: 20;
        readonly description: "validation error";
    };
    readonly 21: {
        readonly code: 21;
        readonly description: "authorization error";
    };
    readonly 23: {
        readonly code: 23;
        readonly description: "mongo error";
    };
    readonly 25: {
        readonly code: 25;
        readonly description: "console log error";
    };
    readonly 26: {
        readonly code: 26;
        readonly description: "authorization error sign in";
    };
    readonly 27: {
        readonly code: 27;
        readonly description: "authorization error sign out";
    };
    readonly 28: {
        readonly code: 28;
        readonly description: "authorization error signup";
    };
};
export interface CommonResponseType<DataPayload = any, MetaPayload = any> {
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
export type BusinessEndPoints = "/business" | "/business/{businessId}" | "/business/{businessId}/admins" | "/business/{businessId}/services" | "/business/{businessId}/categories" | "/business/{businessId}/hours" | "/business/{businessId}/events" | "/business/{businessId}/clients" | "/business/{businessId}/staff" | "/business/register";
