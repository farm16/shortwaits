import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  PURGE,
} from "redux-persist";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// services
import { shortwaitsApi } from "../services/shortwaits-api";
import { reducers } from "./rootReducer";

/**
 * @link https://github.com/rt2zz/redux-persist/issues/988
 */
// const defaultMiddlewareOptions = {
//   // https://github.com/reduxjs/redux-toolkit/issues/415
//   immutableCheck: false,
//   serializableCheck: {
//     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//   },
// };

const middlewares = getDefaultMiddleware().concat(shortwaitsApi.middleware);

if (__DEV__ && !process.env.JEST_WORKER_ID) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const createDebugger = require("redux-flipper").default;
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: reducers,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== "production",
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// const persistor = persistStore(store);

export { store };
