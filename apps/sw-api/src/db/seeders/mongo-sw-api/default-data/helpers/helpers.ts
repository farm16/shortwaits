import { BusinessMembership, ServiceColorsType, WeekHoursType } from "@shortwaits/shared-lib";
import { businessCategories } from "../business-category/business-category";

export const categoriesIds = businessCategories.map(category => category._id);

export const defaultServiceColors: ServiceColorsType = {
  red: {
    colorId: "1",
    colorName: "red",
    hexCode: "#e07a5f",
    isSelected: null,
    isDefault: true,
  },
  blue: {
    colorId: "2",
    colorName: "blue",
    hexCode: "#0c41ff",
    isSelected: null,
    isDefault: false,
  },
  green: {
    colorId: "3",
    colorName: "green",
    hexCode: "#7ac590",
    isSelected: null,
    isDefault: false,
  },
  yellow: {
    colorId: "4",
    colorName: "yellow",
    hexCode: "#f2cc8f",
    isSelected: null,
    isDefault: false,
  },
  lightBlue: {
    colorId: "5",
    colorName: "lightBlue",
    hexCode: "#4ceaff",
    isSelected: null,
    isDefault: false,
  },
  purple: {
    colorId: "6",
    colorName: "purple",
    hexCode: "#766fff",
    isSelected: null,
    isDefault: false,
  },
};

export const defaultBusinessHours: WeekHoursType = {
  mon: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  tue: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  wed: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  thu: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  fri: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  sat: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
  sun: [
    {
      startTime: 540,
      endTime: 1020,
      isActive: true,
    },
  ],
};

export const memberships: BusinessMembership[] = [
  {
    short_id: "1000",
    name: "Free",
    description: "Free membership plan",
    prices: [
      {
        country: "USA",
        currency: "USD",
        priceInCents: 0,
        price: 0,
        validity_period: "1 month",
      },
      {
        country: "Peru",
        currency: "PEM",
        priceInCents: 0,
        price: 0,
        validity_period: "1 month",
      },
    ],
    permissions: {
      add_business_staff: {
        isAllowed: true,
        hasLimit: true,
        min: 1,
        max: 1,
      },
      add_business_client: {
        isAllowed: true,
        hasLimit: true,
        min: 1,
        max: 1000,
      },
      add_business_service: {
        isAllowed: true,
        hasLimit: true,
        min: 1,
        max: 100,
      },
      add_business_event: {
        isAllowed: true,
        hasLimit: true,
        min: 1,
        max: 1100,
      },
      remove_business_staff: {
        isAllowed: true,
        hasLimit: false,
      },
      remove_business_client: {
        isAllowed: true,
        hasLimit: false,
      },
      remove_business_service: {
        isAllowed: true,
        hasLimit: false,
      },
      remove_business_event: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_staff: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_client: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_service: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_event: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_event_status_to_pending: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_event_status_to_approved: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_event_status_to_rejected: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_event_status_to_cancelled: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_event_status_to_completed: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_hours: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_web: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_booking: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_payment_methods: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_disabled: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_location: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_description: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_email: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_labels: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_categories: {
        isAllowed: false,
        hasLimit: false,
        min: 0,
        max: 0,
      },
    },
    isActive: true,
  },
  {
    short_id: "1001",
    name: "Premium",
    description: "Premium membership plan",
    prices: [
      {
        country: "USA",
        currency: "USD",
        priceInCents: 199,
        price: 1.99,
        validity_period: "1 month",
      },
      {
        country: "Peru",
        currency: "PEM",
        priceInCents: 199,
        price: 1.99,
        validity_period: "1 month",
      },
    ],
    permissions: {
      add_business_staff: {
        isAllowed: true,
        hasLimit: false,
        min: 1,
        max: 1,
      },
      add_business_client: {
        isAllowed: true,
        hasLimit: false,
        min: 1,
        max: 1,
      },
      add_business_service: {
        isAllowed: true,
        hasLimit: false,
        min: 1,
        max: 1,
      },
      add_business_event: {
        isAllowed: true,
        hasLimit: false,
        min: 1,
        max: 1,
      },
      remove_business_staff: {
        isAllowed: true,
        hasLimit: false,
      },
      remove_business_client: {
        isAllowed: true,
        hasLimit: false,
      },
      remove_business_service: {
        isAllowed: true,
        hasLimit: false,
      },
      remove_business_event: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_staff: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_client: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_service: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_event: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_event_status_to_pending: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_event_status_to_approved: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_event_status_to_rejected: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_event_status_to_cancelled: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_event_status_to_completed: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_hours: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_web: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_booking: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_payment_methods: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_disabled: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_location: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_description: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_email: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_labels: {
        isAllowed: true,
        hasLimit: false,
      },
      update_business_categories: {
        isAllowed: false,
        hasLimit: false,
        min: 0,
        max: 0,
      },
    },
    isActive: true,
  },
];
