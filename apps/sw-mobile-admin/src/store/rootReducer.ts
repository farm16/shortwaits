import { persistReducer } from "redux-persist";
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
  staffSlice,
  clientsSlice,
} from "./slices";
import { persistRootConfig } from "./redux-persist";

const _combineReducers = combineReducers({
  [shortwaitsApi.reducerPath]: shortwaitsApi.reducer,
  [userSlice.name]: userSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [businessSlice.name]: businessSlice.reducer,
  [servicesSlice.name]: servicesSlice.reducer,
  [eventsSlice.name]: eventsSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [mobileAdminSlice.name]: mobileAdminSlice.reducer,
  [staffSlice.name]: staffSlice.reducer,
  [clientsSlice.name]: clientsSlice.reducer,
});

export const persistedReducer = persistReducer(persistRootConfig, _combineReducers);
