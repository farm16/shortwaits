export const iconProps = {
  "arrow-top-right": {
    name: "arrow-top-right",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: 20,
  },
  "arrow-top-left": {
    name: "arrow-top-left",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: 20,
  },
  edit: {
    name: "pencil",
    color: "brandPrimary",
    backgroundColor: undefined,
    size: 21,
  },
  search: {
    name: "magnify",
    color: "brandPrimary",
    backgroundColor: undefined,
    size: 23,
  },
  cancel: {
    name: "cancel",
    color: "red4",
    backgroundColor: undefined,
    size: 24,
  },
  delete: {
    name: "delete-forever",
    color: "red4",
    backgroundColor: undefined,
    size: 26,
  },
  "search-close": {
    name: "magnify-close",
    color: "brandPrimary",
    backgroundColor: undefined,
    size: 23,
  },
  check: {
    name: "check",
    color: "white",
    backgroundColor: "brandAccent",
    size: 26,
  },
  close: {
    name: "close",
    color: "brandPrimary",
    backgroundColor: undefined,
    size: 30,
  },
  "business-header": {
    name: "store",
    color: "brandPrimary",
    backgroundColor: "white",
    size: 30,
  },
  business: {
    name: "store",
    color: "brandPrimary",
    backgroundColor: undefined,
    size: 20,
  },
  "business-settings": {
    name: "store-cog",
    color: "brandPrimary",
    backgroundColor: undefined,
    size: 20,
  },
  save: {
    name: "content-save-outline",
    color: "brandPrimary",
    backgroundColor: undefined,
    size: 26,
  },
  "open-business": {
    name: "door-open",
    color: "green",
    backgroundColor: undefined,
    size: 25,
  },
  "closed-business": {
    name: "door-closed-lock",
    backgroundColor: undefined,
    color: "failed",
    size: 25,
  },
  "account-cancel": {
    name: "account-cancel",
    color: "brandPrimary",
    backgroundColor: undefined,
    size: 24,
  },
  "add-categories": {
    name: "plus",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 24,
  },
  "add-currency": {
    name: "plus",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 24,
  },
  "add-staff": {
    name: "account-plus-outline",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 21,
  },
  "add-client": {
    name: "account-plus-outline",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 21,
  },
  "add-services": {
    name: "text-box-plus",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 26,
  },
  "add-image": {
    name: "camera-plus",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 24,
  },
  more: {
    name: "camera-plus",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 24,
  },
  add: {
    name: "plus",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 26,
  },
  sync: {
    name: "sync",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 26,
  },
  contactSync: {
    name: "account-sync-outline",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 24,
  },
  share: {
    name: "share-variant",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 21,
  },
  calendar: {
    name: "calendar-range-outline",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 21,
  },
  magnify: {
    name: "magnify",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 21,
  },
  qr: {
    name: "qrcode",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 21,
  },
  "scan-qr": {
    name: "qrcode-scan",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 21,
  },
  list: {
    name: "format-list-text",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 21,
  },
  default: {
    name: "plus",
    backgroundColor: undefined,
    color: "brandPrimary",
    size: 26,
  },
} as const;

export type IconProps = keyof typeof iconProps;
