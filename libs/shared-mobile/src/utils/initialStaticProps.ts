import { merge } from "lodash";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

/**
 * This is the initial props are statically set in the app at the time of js bundle load.
 */
export let initialStaticProps = {
  brandColors: {
    primary: "#FF0000",
    secondary: "#00FF00",
    tertiary: "#0000FF",
  },
  osVersion: `${Platform.Version}`,
  os: Platform.OS,
  isTablet: DeviceInfo.isTablet(),
  buildNumber: DeviceInfo.getBuildNumber(),
  appVersion: DeviceInfo.getVersion(),
};

export type InitialStaticProps = typeof initialStaticProps;

export const getInitialStaticPropsFromNative = (props: InitialStaticProps) => {
  const initialPropsObject = JSON.parse(JSON.stringify(props));
  console.log("Setting initialPropsObject >>>", initialPropsObject);
  initialStaticProps = merge(initialStaticProps, initialPropsObject);
};
