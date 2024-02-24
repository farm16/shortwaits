import { CommonResponseType, DocType } from ".";
import { ShortwaitsAdminDefaultDataType } from "..";

export type ShortwaitsAdminDefaultDataSuccessResponseType = CommonResponseType<ShortwaitsAdminDefaultDataPayloadType>;

export type ShortwaitsAdminDefaultDataPayloadType = DocType<ShortwaitsAdminDefaultDataType>;

export type ShortwaitsAdminDefaultDataSuccessFnType = (payload: ShortwaitsAdminDefaultDataPayloadType, message: string) => ShortwaitsAdminDefaultDataSuccessResponseType;

export type AvailableLanguagesType = "en" | "es" | null;
