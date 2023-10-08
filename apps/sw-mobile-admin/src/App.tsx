import React from "react";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { PortalProvider as GPortalProvider, enableLogging } from "@gorhom/portal";
import { IntlProvider } from "react-intl";

import { AppNavigator } from "./navigation";
import { persistor, store } from "./store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import copies from "./i18n/copies.json";
import { Banner, FloatingActionButton, PremiumMembershipModal } from "./components";

enableLogging();

export const App = () => {
  return (
    <WithProviders>
      <Banner />
      <FloatingActionButton />
      <PremiumMembershipModal />
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
  const { preferredLanguage, deviceInfo } = store.getState().mobileAdmin;
  const language = preferredLanguage || deviceInfo.language;
  const messages = copies[language] || copies.en;
  return (
    <ReduxProvider store={store}>
      <IntlProvider locale={language} messages={messages}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <PaperProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <GPortalProvider rootHostName="root">{children}</GPortalProvider>
              </GestureHandlerRootView>
            </PaperProvider>
          </SafeAreaProvider>
        </PersistGate>
      </IntlProvider>
    </ReduxProvider>
  );
}
