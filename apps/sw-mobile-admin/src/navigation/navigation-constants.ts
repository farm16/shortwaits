export const UNAUTHORIZED_SCREENS = {
  WELCOME_SCREEN: "welcome-screen",
  ONBOARDING_1_SCREEN: "onboarding-1-screen",
  ONBOARDING_2_SCREEN: "onboarding-2-screen",
  SIGN_IN_SCREEN: "sign-in-screen",
  SIGN_IN_WITH_EMAIL_SCREEN: "sign-in-with-email-screen",
  SIGN_UP_SCREEN: "sign-up-screen",
  SIGN_UP_WITH_EMAIL_SCREEN: "sign-up-with-email-screen",
} as const;

export const AUTHORIZED_TAB_SCREENS = {
  EVENTS_SCREEN: "events-screen",
  CLIENTS_SCREEN: "clients-screen",
  MY_BUSINESS_SCREEN: "my-business-screen",
  ACTIVITY_SCREEN: "activity-screen",
  SETTINGS_SCREEN: "settings-screen",
} as const;

export const AUTHORIZED_STACK_SCREENS = {
  EVENT_SCREEN: "event-screen",
  PLANS_SCREEN: "plans-screen",
} as const;

export const AUTHORIZED_SCREENS = {
  ...AUTHORIZED_TAB_SCREENS,
  ...AUTHORIZED_STACK_SCREENS,
} as const;

export const MODAL_SCREENS = {
  SCHEDULE_MODAL_SCREEN: "schedule-modal-screen", // schedule
  SELECTOR_MODAL_SCREEN: "selector-modal-screen", // categories + staff
  SERVICE_MODAL_SCREEN: "service-modal-screen",
  FORM_MODAL_SCREEN: "form-modal-screen",
} as const;

export const NAVIGATION_STACKS = {
  AUTHORIZED_TAB: "authorized-tab",
  AUTHORIZED_STACK: "authorized-stack",
  UNAUTHORIZED: "unauthorized",
  MODALS: "modals",
} as const;
