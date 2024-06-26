export const UNAUTHORIZED_SCREENS = {
  WELCOME_SCREEN: "welcome-screen",
  SIGN_IN_SCREEN: "sign-in-screen",
  SIGN_UP_SCREEN: "sign-up-screen",
} as const;

export const AUTHORIZED_TAB_SCREENS = {
  HOME_SCREEN: "home-screen",
  HISTORY_SCREEN: "history-screen",
  FAVORITES_SCREEN: "favorites-screen",
  SETTINGS_SCREEN: "settings-screen",
} as const;

export const AUTHORIZED_STACK_SCREENS = {
  EVENT_DETAILS_SCREEN: "event-details-screen",
  BUSINESS_DETAILS_SCREEN: "business-details-screen",
  USER_PROFILE_SCREEN: "user-profile-screen",
} as const;

export const AUTHORIZED_SCREENS = {
  ...AUTHORIZED_TAB_SCREENS,
  ...AUTHORIZED_STACK_SCREENS,
} as const;

export const MODAL_SCREENS = {
  EVENT_TICKET_MODAL_SCREEN: "event-ticket-modal-screen",
  SCHEDULE_MODAL_SCREEN: "schedule-modal-screen",
  SELECTOR_MODAL_SCREEN: "selector-modal-screen",
  QR_SCANNER_MODAL_SCREEN: "qr-scanner-modal-screen",
  UPDATE_CLIENT_MODAL_SCREEN: "update-client-modal-screen",
} as const;

export const NAVIGATION_STACKS = {
  AUTHORIZED_TAB: "authorized-tab",
  AUTHORIZED_STACK: "authorized-stack",
  UNAUTHORIZED: "unauthorized",
  MODALS: "modals",
} as const;
