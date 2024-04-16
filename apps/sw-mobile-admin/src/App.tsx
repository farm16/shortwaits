import { PortalProvider as GPortalProvider, enableLogging } from "@gorhom/portal";
import { InitialStaticProps, getInitialStaticPropsFromNative } from "@shortwaits/shared-mobile";
import { PremiumMembershipModal } from "@shortwaits/shared-ui";
import React from "react";
import { IntlProvider } from "react-intl";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import copies from "./i18n/copies.json";
import { AppNavigator } from "./navigation";
import { persistor, store } from "./store";

enableLogging();

export const App = (initialStaticProps: InitialStaticProps) => {
  getInitialStaticPropsFromNative(initialStaticProps);

  return (
    <WithProviders>
      {/* <Banner />
      <FloatingActionButton /> */}
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
  const paperTheme = {
    ...DefaultTheme,
  };
  const { preferredLanguage, suggestedLanguage } = store.getState().mobileAdmin;
  const language = preferredLanguage || suggestedLanguage;
  const messages = copies[language] || copies.en;
  return (
    <ReduxProvider store={store}>
      <IntlProvider locale={language} messages={messages}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <PaperProvider theme={paperTheme}>
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
