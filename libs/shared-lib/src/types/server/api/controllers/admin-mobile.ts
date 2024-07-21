import { CommonResponseType, DocType, ShortwaitsStore } from "../../..";

export type ShortwaitsAdminDefaultDataSuccessResponseType = CommonResponseType<ShortwaitsAdminDefaultDataPayloadType>;

export type ShortwaitsAdminDefaultDataPayloadType = DocType<ShortwaitsStore>;

export type ShortwaitsAdminDefaultDataSuccessFnType = (payload: ShortwaitsAdminDefaultDataPayloadType, message: string) => ShortwaitsAdminDefaultDataSuccessResponseType;

export type AvailableLanguagesType = "en" | "es" | null;
