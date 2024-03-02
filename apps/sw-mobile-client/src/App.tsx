import { PortalProvider as GPortalProvider } from "@gorhom/portal";
import { InitialProps, setInitialProps } from "@shortwaits/shared-lib";
import { Toast } from "@shortwaits/shared-ui";
import React from "react";
import { IntlProvider } from "react-intl";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import copies from "./i18n/copies.json";
import { AppNavigator } from "./navigation";
import { persistor, store } from "./store";

export function App(initialProps: InitialProps) {
  setInitialProps(initialProps);

  return (
    <WithProviders>
      <AppNavigator />
      <Toast />
    </WithProviders>
  );
}

/**
 * All HOC for visuals (UI)
 * contains :
 * - PaperProvider
 * - BottomSheetModalProvider
 * - SafeAreaProvider
 */

function WithProviders({ children }: { children: React.ReactNode }) {
  const messages = copies.en; //|| copies.en;

  console.log("store", store);
  return (
    <ReduxProvider store={store}>
      <IntlProvider locale={"en"} messages={messages}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <GPortalProvider>
                <PaperProvider>{children}</PaperProvider>
              </GPortalProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </PersistGate>
      </IntlProvider>
    </ReduxProvider>
  );
}
