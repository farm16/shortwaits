import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { shortwaitsApi } from "../services";

//reducers
import { persistRootConfig } from "./redux-persist";
import { authSlice, businessSlice, clientsSlice, eventsSlice, mobileAdminSlice, servicesSlice, staffSlice, themeSlice, userSlice } from "./slices";

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
