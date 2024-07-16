const { getObjectId } = require("mongo-seeding");

const memberships = [
  {
    _id: getObjectId("1000"),
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
      update_business_memberships: {
        isAllowed: true,
      },
    },
    isActive: true,
  },
  {
    _id: getObjectId("1001"),
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
        isAllowed: true,
      },
    },
    isActive: true,
  },
  // {
  //   permissions: null,
  //   isActive: false,
  // },
  // {
  //   permissions: null,
  //   isActive: false,
  // },
  // {
  //   permissions: null,
  //   isActive: false,
  // },
  // {
  //   permissions: null,
  //   isActive: false,
  // },
  // {
  //   permissions: null,
  //   isActive: false,
  // },
  // {
  //   permissions: null,
  //   isActive: false,
  // },
];

module.exports = memberships;
