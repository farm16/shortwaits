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
import {
  //persistor,
  store,
} from "./redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <PaperProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <GPortalProvider rootHostName="root">{children}</GPortalProvider>
          </GestureHandlerRootView>
        </PaperProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
