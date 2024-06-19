import { PortalProvider as GPortalProvider, enableLogging } from "@gorhom/portal";
import { InitialStaticProps, getInitialStaticPropsFromNative } from "@shortwaits/shared-mobile";
import { PremiumMembershipModal } from "@shortwaits/shared-ui";
import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import copies from "./i18n/copies.json";
import { AppNavigator } from "./navigation";
import { persistor, store, useMobileAdmin } from "./store";
import { WithInitializers } from "./utils";

enableLogging();

export const App = (initialStaticProps: InitialStaticProps) => {
  getInitialStaticPropsFromNative(initialStaticProps);

  return (
    <WithProviders>
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
  return (
    <ReduxProvider store={store}>
      <WithInitializers>
        <IntlProvider>
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
      </WithInitializers>
    </ReduxProvider>
  );
}

function IntlProvider({ children }: { children: React.ReactNode }) {
  const { preferredLanguage, suggestedLanguage } = useMobileAdmin();
  const language = preferredLanguage || suggestedLanguage;
  const messages = copies[language] || copies.en;

  return (
    <ReactIntlProvider locale={language} messages={messages}>
      {children}
    </ReactIntlProvider>
  );
}
