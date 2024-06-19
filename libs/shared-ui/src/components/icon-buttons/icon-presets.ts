export const ICON_SIZE = 26;
export const iconProps = {
  "arrow-top-right": {
    name: "arrow-top-right",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  "arrow-top-left": {
    name: "arrow-top-left",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  edit: {
    name: "pencil",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  search: {
    name: "magnify",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  cancel: {
    name: "cancel",
    color: "red4",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  delete: {
    name: "delete-forever",
    color: "red4",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  "search-close": {
    name: "magnify-close",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  check: {
    name: "check",
    color: "white",
    backgroundColor: "brandAccent",
    size: ICON_SIZE,
  },
  close: {
    name: "close",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  "business-header": {
    name: "store",
    color: "brandSecondary",
    backgroundColor: "white",
    size: ICON_SIZE,
  },
  business: {
    name: "store",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  "business-settings": {
    name: "store-cog",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  save: {
    name: "content-save-outline",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  "open-business": {
    name: "door-open",
    color: "green",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  "closed-business": {
    name: "door-closed-lock",
    backgroundColor: undefined,
    color: "failed",
    size: ICON_SIZE,
  },
  "account-cancel": {
    name: "account-cancel",
    color: "brandSecondary",
    backgroundColor: undefined,
    size: ICON_SIZE,
  },
  "add-categories": {
    name: "plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  "add-currency": {
    name: "plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  "add-staff": {
    name: "account-plus-outline",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  "add-client": {
    name: "account-plus-outline",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  "add-services": {
    name: "text-box-plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  "add-image": {
    name: "camera-plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  more: {
    name: "camera-plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  add: {
    name: "plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE + 2,
  },
  sync: {
    name: "sync",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  contactSync: {
    name: "account-sync-outline",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  share: {
    name: "share-variant",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  calendar: {
    name: "calendar-range-outline",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  magnify: {
    name: "magnify",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  qr: {
    name: "qrcode",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  "scan-qr": {
    name: "qrcode-scan",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  list: {
    name: "format-list-text",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  "three-dots": {
    name: "dots-vertical",
    backgroundColor: undefined,
    color: "black",
    size: ICON_SIZE,
  },
  "favorite-outline": {
    name: "heart-outline",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  favorite: {
    name: "heart",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  information: {
    name: "information-outline",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  reset: {
    name: "reload",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
  default: {
    name: "plus",
    backgroundColor: undefined,
    color: "brandSecondary",
    size: ICON_SIZE,
  },
} as const;

export type IconPropsType = typeof iconProps;

export type IconProps = keyof typeof iconProps;
