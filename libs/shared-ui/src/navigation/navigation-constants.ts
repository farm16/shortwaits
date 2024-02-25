export const UNAUTHORIZED_SCREENS = {} as const;

export const AUTHORIZED_TAB_SCREENS = {} as const;

export const AUTHORIZED_STACK_SCREENS = {} as const;

export const AUTHORIZED_SCREENS = {
  ...AUTHORIZED_TAB_SCREENS,
  ...AUTHORIZED_STACK_SCREENS,
} as const;

export const MODAL_SCREENS = {
  QR_SCANNER_MODAL_SCREEN: "qr-scanner-modal-screen",
} as const;

export const NAVIGATION_STACKS = {
  AUTHORIZED_TAB: "authorized-tab",
  AUTHORIZED_STACK: "authorized-stack",
  UNAUTHORIZED: "unauthorized",
  MODALS: "modals",
} as const;
