import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore } from "redux-persist";
import { shortwaitsApi } from "../services";
import { persistedReducer } from "./rootReducer";

const middlewares = [shortwaitsApi.middleware];

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createDebugger = require("redux-flipper").default;
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

const persistor = persistStore(store);

export { persistor, store };
