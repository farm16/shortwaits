import { Document } from "mongoose";

import { ObjectId } from "../common-types";
import { BusinessHoursType, CurrencyType, ServiceColorsType } from "./helpers";
import { ServiceType } from "./services";

/**
 * externalizing this will be a future task/feature
 * will include deep linking, backgrounds images, themes, etc.
 */
export type ShortwaitsAdminBannersType = {
  id: string;
  short_id: string;
  name: string;
};

export type SubscriptionPlans = SubscriptionPlan[];
export type SubscriptionPlan = {
  title: string;
  planColor: string;
  tags: string[];
  hasOffer: boolean;
  offerDescription: string;
  offerCode: string;
  finalPrice: number;
  price: number;
  priceDescription: string;
  planDescription: string;
  planId: string;
};

export type ShortwaitsAdminDefaultDataType = {
  short_id: string;
  banners: ShortwaitsAdminBannersType[];
  name: string;
  description: string;
  links: string[];
  subscriptionPlans: SubscriptionPlans;
  suggestedLang: string;
  blackList: string[];
  timeZones: string[];
  serviceColors: ServiceColorsType;
  categories: ObjectId[];
  defaultBusinessData: {
    services: Partial<ServiceType>[];
    currencies: CurrencyType[];
    hours: BusinessHoursType;
  };
  accountPermissions: AccountPermissions;
};

export type AccountPermissions = {
  free: Record<string, PermissionProps>;
  premium: Record<string, PermissionProps>;
  student: Record<string, PermissionProps>;
  basic: Record<string, PermissionProps>;
  trial: Record<string, PermissionProps>;
  business: Record<string, PermissionProps>;
  enterprise: Record<string, PermissionProps>;
  partner: Record<string, PermissionProps>;
};

type PermissionProps = {
  isAllowed: boolean;
  hasLimit: boolean;
  min: number;
  max: number;
};
