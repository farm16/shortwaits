import { Document } from "mongoose";

import { ObjectId } from "../common";
import { BusinessHoursType, CurrencyType, ServiceColorsType } from "./helpers";
import { ServicesType } from "./services";

export type ShortwaitsAdminDefaultDataDocType = ShortwaitsAdminDefaultDataType &
  Document;

export type ShortwaitsAdminDefaultDataType = {
  short_id: string;
  name: string;
  description: string;
  links: string[];
  suggestedLang: string;
  blackList: string[];
  timeZones: string[];
  serviceColors: ServiceColorsType;
  categories: ObjectId[];
  sampleBusinessData: {
    services: Partial<ServicesType>[];
    currencies: CurrencyType[];
    hours: BusinessHoursType;
  };
};
