export const UNAUTHORIZED_SCREENS = {
  WELCOME_SCREEN: "welcome-screen",
  SIGN_IN_SCREEN: "sign-in-screen",
  SIGN_UP_SCREEN: "sign-up-screen",
} as const;

export const AUTHORIZED_TAB_SCREENS = {
  HOME_SCREEN: "home-screen",
  HISTORY_SCREEN: "history-screen",
  SCAN_SCREEN: "scan-screen",
  MY_FAVORITES_SCREEN: "favorites-screen",
  SETTINGS_SCREEN: "settings-screen",
} as const;

export const AUTHORIZED_STACK_SCREENS = {
  EVENT_DETAILS_SCREEN: "event-details-screen",
  PLACE_DETAILS_SCREEN: "place-details-screen",
  PROFILE_SCREEN: "user-profile-screen",
} as const;

export const AUTHORIZED_SCREENS = {
  ...AUTHORIZED_TAB_SCREENS,
  ...AUTHORIZED_STACK_SCREENS,
} as const;

export const MODAL_SCREENS = {
  SCHEDULE_MODAL_SCREEN: "schedule-modal-screen",
  SELECTOR_MODAL_SCREEN: "selector-modal-screen",
} as const;

export const NAVIGATION_STACKS = {
  AUTHORIZED_TAB: "authorized-tab",
  AUTHORIZED_STACK: "authorized-stack",
  UNAUTHORIZED: "unauthorized",
  MODALS: "modals",
} as const;
