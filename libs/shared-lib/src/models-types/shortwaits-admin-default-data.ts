import { Document } from "mongoose";

import { ObjectId } from "../common-types";
import { BusinessHoursType, CurrencyType, ServiceColorsType } from "./helpers";
import { ServicesType } from "./services";

/**
 * externalizing this will be a future task/feature
 * will include deep linking, backgrounds images, themes, etc.
 */
export type ShortwaitsAdminBannersType = {
  id: string;
  short_id: string;
  name: string;
};

export type ShortwaitsAdminDefaultDataType = {
  short_id: string;
  banners: ShortwaitsAdminBannersType[];
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
