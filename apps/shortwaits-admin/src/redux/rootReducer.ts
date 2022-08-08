import { persistReducer } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers } from "redux"
import { api } from "@/services/api"

//reducers
import theme from "./theme"
import auth from "./auth"
import user from "./user"
import business from "./business"
import defaultMobileData from "./mobile-admin"

const persistAuthConfig = {
  key: "auth",
  storage: AsyncStorage
}

const persistRootConfig = {
  key: "root",
  storage: AsyncStorage
}

const reducers = combineReducers({
  user,
  auth: persistReducer(persistAuthConfig, auth),
  theme,
  business,
  defaultMobileData,
  [api.reducerPath]: api.reducer
})

const combinedRootReducer = (state, action) => {
  if (action.type === "USER_SIGN_OUT") {
    state = undefined
  }
  return reducers(state, action)
}

export const rootReducer = persistReducer(
  persistRootConfig,
  combinedRootReducer
)
