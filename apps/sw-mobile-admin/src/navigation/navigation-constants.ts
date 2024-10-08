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
  BUSINESS_CLIENT_PROFILE_SCREEN: "business-client-profile-screen",
  BUSINESS_LOCAL_CLIENT_PROFILE_SCREEN: "business-local-client-profile-screen",
  BUSINESS_USER_PROFILE_SCREEN: "business-user-profile-screen",
  APP_INFO_SCREEN: "app-info-screen",
  INTEGRATIONS_SCREEN: "integrations-screen",
  REVIEW_SCREEN: "review-screen",
} as const;

export const AUTHORIZED_SCREENS = {
  ...AUTHORIZED_TAB_SCREENS,
  ...AUTHORIZED_STACK_SCREENS,
} as const;

export const MODAL_SCREENS = {
  UPDATE_BUSINESS_PROFILE_SCREEN: "update-business-profile-screen",
  SCHEDULE_MODAL_SCREEN: "schedule-modal-screen",
  SELECTOR_MODAL_SCREEN: "selector-modal-screen",
  SERVICE_MODAL_SCREEN: "service-modal-screen",
  ADD_EVENT_MODAL_SCREEN: "add-event-modal-screen",
  UPDATE_EVENT_MODAL_SCREEN: "update-event-modal-screen",
  ADD_SERVICE_MODAL_SCREEN: "add-service-modal-screen",
  UPDATE_SERVICE_MODAL_SCREEN: "update-service-modal-screen",
  ADD_CLIENT_MODAL_SCREEN: "add-client-modal-screen",
  ADD_LOCAL_CLIENT_MODAL_SCREEN: "add-local-client-modal-screen",
  UPDATE_LOCAL_CLIENT_MODAL_SCREEN: "update-local-client-modal-screen",
  BUSINESS_CLIENTS_MODAL_SCREEN: "business-clients-modal-screen",
  ADD_STAFF_MODAL_SCREEN: "add-staff-modal-screen",
  UPDATE_STAFF_MODAL_SCREEN: "update-staff-modal-screen",
  WEBVIEW_MODAL_SCREEN: "webview-modal-screen",
  QR_SCANNER_MODAL_SCREEN: "qr-scanner-modal-screen",
} as const;

export const NAVIGATION_STACKS = {
  AUTHORIZED_TAB: "authorized-tab",
  AUTHORIZED_STACK: "authorized-stack",
  UNAUTHORIZED: "unauthorized",
  MODALS: "modals",
} as const;
