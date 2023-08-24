import { Platform } from "react-native";
import React, { useEffect, useState } from "react";
import DeviceInfo from "react-native-device-info";
import { Accordion, AccordionDataItemType } from "../../../../components"; // Import the Accordion component

const appName = DeviceInfo.getApplicationName();
const appVersion = DeviceInfo.getVersion();
const appBuildNumber = DeviceInfo.getBuildNumber();
const appBundleId = DeviceInfo.getBundleId();
const deviceType = DeviceInfo.getDeviceType();

export const AppInfoSettings = () => {
  const [apiLevel, setApiLevel] = useState(0);

  useEffect(() => {
    if (Platform.OS === "android") {
      DeviceInfo.getApiLevel().then(apiLevel => {
        setApiLevel(apiLevel);
      });
    } else {
      return;
    }
  }, []);

  const accordionData: AccordionDataItemType[] = [
    {
      title: "App Name",
      description: appName,
    },
    {
      title: "App Version",
      description: `v.${appVersion}-${appBuildNumber}${__DEV__ ? "  _dev_" : "  _prod_"}`,
    },
    {
      title: "App Bundle Id",
      description: appBundleId,
    },
    {
      title: "Codepush Version",
      description: "v.1.0.0", // Replace with your actual codepush version
    },
    {
      title: "Target Device",
      description: `${deviceType} ${Platform.OS === "android" ? "| " + apiLevel : ""}`,
    },
  ];

  return <Accordion accordionTitle="App Information" accordionData={accordionData} />;
};
