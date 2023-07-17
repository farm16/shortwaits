import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import {
  Portal as PaperPortalProvider,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import {
  PortalProvider as GPortalProvider,
  enableLogging,
} from "@gorhom/portal";

import { AppNavigator } from "./navigation";
import { persistor, store } from "./store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";

enableLogging();

export const App = () => {
  return (
    <WithProviders>
      <AppNavigator />
    </WithProviders>
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
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <PaperProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <GPortalProvider rootHostName="root">{children}</GPortalProvider>
            </GestureHandlerRootView>
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
