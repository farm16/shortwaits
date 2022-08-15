import { ObjectId } from "../common";

export type ApiResponseWithPayload<Payload> = {
  readonly status: "success" | "error" | "pending";
  readonly success: boolean;
  readonly data: Payload;
  readonly messages?: readonly string[];
};

export type RegisterWithEmailRequest = {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly password?: string;
};

export type DocType<T = never> = T & {
  readonly _id: ObjectId;
};

export type SuccessResponseType<Payload = never> = {
  readonly status: "success" | "pending";
  readonly success: boolean;
  readonly message: string;
  readonly data: Payload;
};
export type SuccessResponseFnType<Payload = never> = (
  payload: Payload,
  status: "success" | "pending",
  message: string
) => SuccessResponseType<Payload>;

export type ErrorResponseFnType = (
  code: ErrorCodeType,
  message: string,
  errors: readonly ErrorsWithCodeType[]
) => ErrorResponseType;

export type ErrorResponseType = ErrorsWithCodeType & {
  readonly status: "error";
  readonly success: false;
  readonly errors: readonly ErrorsWithCodeType[];
};

export type ErrorsWithCodeType = {
  readonly code: ErrorCodeType;
  readonly message?: string;
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

export interface CommonResponseType<T = any> {
  statusCode: number;
  data: T;
  message?: string;
  meta: any;
}
// } "meta": {
//   "page": 1,
//   "per_page": 2,
//   "total_pages": 7,
//   "total_count": 14
// }
