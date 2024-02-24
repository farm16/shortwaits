import { LocalClientDtoType } from "./client-local";

export type BusinessClientType = "external" | "local";
export type AllClientsType = (Omit<LocalClientDtoType, "clientType"> & { clientType: BusinessClientType })[];
