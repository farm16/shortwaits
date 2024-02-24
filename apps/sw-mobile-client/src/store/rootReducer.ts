import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { shortwaitsApi } from "../services";
import { persistRootConfig } from "./redux-persist";
import { authSlice, deviceInfoSlice, shortwaitsSlice, userSlice } from "./slices";

const _combineReducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [deviceInfoSlice.name]: deviceInfoSlice.reducer,
  [shortwaitsApi.reducerPath]: shortwaitsApi.reducer,
  [shortwaitsSlice.name]: shortwaitsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  // [businessSlice.name]: businessSlice.reducer,
  // [servicesSlice.name]: servicesSlice.reducer,
  // [eventsSlice.name]: eventsSlice.reducer,
  // [staffSlice.name]: staffSlice.reducer,
  // [clientsSlice.name]: clientsSlice.reducer,
});

export const persistedReducer = persistReducer(persistRootConfig, _combineReducers);
