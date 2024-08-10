import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { shortwaitsApi } from "../services";
import { persistRootConfig } from "./redux-persist";
import { authSlice, businessSlice, businessUsersSlice, clientsSlice, eventsSlice, localClientsSlice, mobileAdminSlice, servicesSlice, themeSlice, userSlice } from "./slices";

const _combineReducers = combineReducers({
  [shortwaitsApi.reducerPath]: shortwaitsApi.reducer,
  [userSlice.name]: userSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [businessSlice.name]: businessSlice.reducer,
  [servicesSlice.name]: servicesSlice.reducer,
  [eventsSlice.name]: eventsSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [mobileAdminSlice.name]: mobileAdminSlice.reducer,
  [businessUsersSlice.name]: businessUsersSlice.reducer,
  [clientsSlice.name]: clientsSlice.reducer,
  [localClientsSlice.name]: localClientsSlice.reducer,
});

export const persistedReducer = persistReducer(persistRootConfig, _combineReducers);
