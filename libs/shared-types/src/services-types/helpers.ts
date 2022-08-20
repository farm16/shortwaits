import { ErrorsWithCodeType } from "../";

export type ServiceDocResponseType<T = never> = {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: ErrorsWithCodeType;
};
