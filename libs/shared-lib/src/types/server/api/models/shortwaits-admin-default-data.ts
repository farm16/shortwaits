import { BusinessHoursType, BusinessLabelType, BusinessVideoConferenceType, CurrencyType, ObjectId, ServiceColorsType } from "../../../";
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

export type ShortwaitsStore = {
  _id?: any;
  short_id: string;
  name: string;
  banners: ShortwaitsAdminBannersType[];
  description: string;
  links: string[];
  subscriptionPlans: SubscriptionPlans;
  suggestedLang: string;
  blackList: string[];
  timeZones: string[];
  categories: ObjectId[];
  serviceColors: ServiceColorsType;
  membershipPlans: BusinessMembership[];
  defaultBusinessData: {
    services: Partial<ServiceType>[];
    currencies: CurrencyType[];
    hours: BusinessHoursType;
    labels: BusinessLabelType[];
    videoConferences: BusinessVideoConferenceType[];
  };
  accountPermissions: AccountPermissions;
};

export type ShortwaitsStores = ShortwaitsStore[];

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

export type BusinessMembershipPrices = {
  country: string;
  currency: string;
  priceInCents: number;
  price: number;
  validity_period: string;
};

export type BusinessPermissions =
  | "add_business_staff"
  | "add_business_client"
  | "add_business_service"
  | "add_business_event"
  | "remove_business_staff"
  | "remove_business_client"
  | "remove_business_service"
  | "remove_business_event"
  | "update_business_staff"
  | "update_business_client"
  | "update_business_service"
  | "update_business_event"
  | "update_business_event_status_to_pending"
  | "update_business_event_status_to_approved"
  | "update_business_event_status_to_rejected"
  | "update_business_event_status_to_cancelled"
  | "update_business_event_status_to_completed"
  | "update_business_hours"
  | "update_business_web"
  | "update_business_booking"
  | "update_business_payment_methods"
  | "update_business_disabled"
  | "update_business_location"
  | "update_business_description"
  | "update_business_email"
  | "update_business_labels"
  | "update_business_categories";

export type BusinessPermissionsType = {
  isAllowed: boolean;
  hasLimit: boolean;
  min?: number;
  max?: number;
};

export type BusinessMembership = {
  short_id: string;
  name: string;
  description: string;
  prices: BusinessMembershipPrices[];
  permissions: Record<BusinessPermissions, BusinessPermissionsType>;
  isActive: boolean;
};
