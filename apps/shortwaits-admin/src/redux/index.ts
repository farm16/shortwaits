import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  PURGE
} from "redux-persist"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

// services
import { api } from "../services/api"
import { rootReducer } from "./rootReducer"

/**
 * @link https://github.com/rt2zz/redux-persist/issues/988
 */
const defaultMiddlewareOptions = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  }
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware(defaultMiddlewareOptions).concat(
      api.middleware
    )

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const createDebugger = require("redux-flipper").default
      middleware.push(createDebugger())
    }

    return middleware
  }
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export const persistor = persistStore(store)
export { store }
