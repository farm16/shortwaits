import React from "react";
import { Provider } from "react-redux";
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";
import { PersistGate } from "redux-persist/lib/integration/react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { PortalProvider, enableLogging } from "@gorhom/portal";

import { AppNavigator } from "./navigation";
import { persistor, store } from "./redux";

enableLogging();

export const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={<ActivityIndicator />} persistor={persistor}> */}
      <WithProviders>
        <AppNavigator />
      </WithProviders>
      {/* </PersistGate> */}
    </Provider>
  );
};

/**
 * All HOC for visuals (UI)
 * contains :
 * - PaperProvider
 * - BottomSheetModalProvider
 * - SafeAreaProvider
 */

function WithProviders({ children }) {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PortalProvider>
        <PaperProvider>{children}</PaperProvider>
      </PortalProvider>
    </SafeAreaProvider>
  );
}
