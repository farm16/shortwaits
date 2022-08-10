import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";

import { shortwaitsApi } from "../services/shortwaits-api";

//reducers
import {
  authReducer,
  businessReducer,
  themeReducer,
  userReducer,
  mobileAdminReducer,
} from "./slices";

const persistRootConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducers = combineReducers({
  user: userReducer,
  auth: authReducer,
  theme: themeReducer,
  business: businessReducer,
  mobileAdmin: mobileAdminReducer,
  [shortwaitsApi.reducerPath]: shortwaitsApi.reducer,
});

// const combinedRootReducer = (state, action) => {
//   if (action.type === "USER_SIGN_OUT") {
//     state = undefined;
//   }
//   return reducers(state, action);
// };

export const persistedReducer = persistReducer(persistRootConfig, reducers);
