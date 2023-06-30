import ENV from "react-native-config";
import { AUTH } from "./endpoints/auth";
import { BUSINESS } from "./endpoints/business";
import { CATEGORIES } from "./endpoints/categories";
import { EVENTS } from "./endpoints/events";
import { SERVICES } from "./endpoints/services";
import { USERS } from "./endpoints/users";

const API_VERSION = "v1";
export const API_BASE_URL = ENV.API_BASE_URL + "/" + API_VERSION;

console.log("API_BASE_URL >>>", API_BASE_URL);

export const shortwaitsApiEndpoints = {
  SHORTWAITS: {
    getAdminMobile: {
      getPath: () => "/shortwaits/admin/mobile",
      METHOD: "GET",
    },
  },
  AUTH,
  USERS,
  CATEGORIES,
  SERVICES,
  EVENTS,
  BUSINESS,
} as const;
