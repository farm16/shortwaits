import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  PURGE,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// services
import { shortwaitsApi } from "../services/shortwaits-api";
import { persistedReducer } from "./rootReducer";
import { useDispatch } from "react-redux";

/**
 * @link https://github.com/rt2zz/redux-persist/issues/988
 */
const defaultMiddlewareOptions = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware(defaultMiddlewareOptions).concat(
      shortwaitsApi.middleware
    );

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const createDebugger = require("redux-flipper").default;
      middleware.push(createDebugger());
    }

    return middleware;
  },
});

export type AppDispatch = typeof store.dispatch;
const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

const persistor = persistStore(store);

export { store, persistor, useAppDispatch };
