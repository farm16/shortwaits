import { LocalClientUserDtoType } from "./local-client-user";

export type BusinessClientType = "external" | "local";
export type AllClientsType = (Omit<LocalClientUserDtoType, "clientType"> & { clientType: BusinessClientType })[];
