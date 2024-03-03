import { PortalProvider as GPortalProvider } from "@gorhom/portal";
import { InitialStaticProps, getInitialStaticPropsFromNative } from "@shortwaits/shared-mobile";
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
import { persistor, store, useDeviceInfo } from "./store";

export function App(initialStaticProps: InitialStaticProps) {
  getInitialStaticPropsFromNative(initialStaticProps);

  return (
    <ReduxProvider store={store}>
      <OtherProviders>
        <AppNavigator />
        <Toast />
      </OtherProviders>
    </ReduxProvider>
  );
}

/**
 * All HOC for visuals (UI)
 * contains :
 * - PaperProvider
 * - BottomSheetModalProvider
 * - SafeAreaProvider
 * - GestureHandlerRootView
 * - GPortalProvider
 * - IntlProvider
 * - PersistGate
 *
 */

function OtherProviders({ children }: { children: React.ReactNode }) {
  const deviceInfo = useDeviceInfo();
  console.log("deviceInfo >>>", deviceInfo);
  const currentLanguage = deviceInfo.preferredLanguage ? deviceInfo.preferredLanguage : deviceInfo.language;
  const messages = currentLanguage ? copies[currentLanguage] : copies.en;

  return (
    <IntlProvider locale={currentLanguage ?? "en"} messages={messages}>
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
  );
}
