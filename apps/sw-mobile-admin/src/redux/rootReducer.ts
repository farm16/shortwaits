import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { shortwaitsApi } from "../services";

//reducers
import {
  authSlice,
  themeSlice,
  businessSlice,
  userSlice,
  mobileAdminSlice,
  servicesSlice,
  eventsSlice,
} from "./slices";

const persistRootConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "theme", "mobileAdmin"],
};

export const reducers = {
  [shortwaitsApi.reducerPath]: shortwaitsApi.reducer,
  [userSlice.name]: userSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [businessSlice.name]: businessSlice.reducer,
  [servicesSlice.name]: servicesSlice.reducer,
  [eventsSlice.name]: eventsSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [mobileAdminSlice.name]: mobileAdminSlice.reducer,
};

const _combineReducers = combineReducers({
  [shortwaitsApi.reducerPath]: shortwaitsApi.reducer,
  [userSlice.name]: userSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [businessSlice.name]: businessSlice.reducer,
  [servicesSlice.name]: servicesSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [mobileAdminSlice.name]: mobileAdminSlice.reducer,
});

// const combinedRootReducer = (state, action) => {
//   if (action.type === "USER_SIGN_OUT") {
//     state = undefined;
//   }
//   return reducers(state, action);
// };

export const persistedReducer = persistReducer(
  persistRootConfig,
  _combineReducers
);
