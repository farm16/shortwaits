import ENV from "react-native-config";

const API_VERSION = ENV.API_VERSION;
const API_BASE_URL = ENV.API_BASE_URL + "/" + API_VERSION;

export const shortwaitsApi = {
  version: API_VERSION,
  baseUrl: API_BASE_URL,
};
