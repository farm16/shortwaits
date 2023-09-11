import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { PortalProvider as GPortalProvider, enableLogging } from "@gorhom/portal";
import { IntlProvider } from "react-intl";

import { AppNavigator } from "./navigation";
import { persistor, store } from "./store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import copies from "./i18n/copies.json";
import { usePreferredLanguage } from "./utils";
import { Banner, FloatingActionButton } from "./components";

enableLogging();

export const App = () => {
  return (
    <WithProviders>
      <Banner />
      <FloatingActionButton />
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
      <WithIntl>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <PaperProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <GPortalProvider rootHostName="root">{children}</GPortalProvider>
              </GestureHandlerRootView>
            </PaperProvider>
          </SafeAreaProvider>
        </PersistGate>
      </WithIntl>
    </ReduxProvider>
  );
}

const WithIntl = ({ children }) => {
  const language = usePreferredLanguage();
  const messages = copies[language] || copies.en;
  return (
    <IntlProvider locale={language} messages={messages}>
      {children}
    </IntlProvider>
  );
};
