import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";
import { shortwaitsApi } from "../services/shortwaits-api";

//reducers
import theme from "./theme";
import auth from "./auth";
import user from "./user";
import business from "./business";
import defaultMobileData from "./mobile-admin";

const persistRootConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducers = combineReducers({
  user,
  auth,
  theme,
  business,
  defaultMobileData,
  [shortwaitsApi.reducerPath]: shortwaitsApi.reducer,
});

// const combinedRootReducer = (state, action) => {
//   if (action.type === "USER_SIGN_OUT") {
//     state = undefined;
//   }
//   return reducers(state, action);
// };

export const persistedReducer = persistReducer(persistRootConfig, reducers);
