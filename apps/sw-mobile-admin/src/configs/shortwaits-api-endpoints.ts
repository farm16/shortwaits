import ENV from "react-native-config";
import { BUSINESS } from "./endpoints/business";
import { CATEGORIES } from "./endpoints/categories";
import { SERVICES } from "./endpoints/services";

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

  // this is still being used
  // todo: remove this
  CATEGORIES,
  SERVICES,
  BUSINESS,
} as const;
