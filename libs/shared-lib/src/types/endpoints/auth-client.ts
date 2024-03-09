import { ClientDtoType } from ".";
import { CommonResponseType } from "./helpers";

export type ClientTokenPayloadType = {
  token: string | null;
  refreshToken: string | null;
};
export type ClientAuthPayloadType = {
  auth: ClientTokenPayloadType;
  attributes?: {
    currentUser: ClientDtoType;
  };
};

export type ClientAuthDtoType = {
  auth: ClientTokenPayloadType;
  attributes?: {
    currentUser: ClientDtoType;
  };
};

export type ClientAuthResponseType = CommonResponseType<ClientAuthDtoType>;

export type ClientAuthFnType = (payload: ClientAuthPayloadType, message: string) => ClientAuthResponseType;

export type ClientRegisterWithEmailRequestType = {
  email: string;
  password: string;
};
