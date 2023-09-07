import { Platform } from "react-native";
import React, { useEffect, useState } from "react";
import DeviceInfo from "react-native-device-info";
import { Accordion, AccordionDataItemType } from "../../../../components"; // Import the Accordion component
import { useIntl } from "react-intl";

const appName = DeviceInfo.getApplicationName();
const appVersion = DeviceInfo.getVersion();
const appBuildNumber = DeviceInfo.getBuildNumber();
const appBundleId = DeviceInfo.getBundleId();
const deviceType = DeviceInfo.getDeviceType();

export const AppInfoSettings = () => {
  const [apiLevel, setApiLevel] = useState(0);
  const intl = useIntl(); // Access the intl object

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
      title: intl.formatMessage({ id: "Settings_Screen.appInfo.appName" }),
      description: intl.formatMessage({ id: "Settings_Screen.appInfo.appName" }),
    },
    {
      title: intl.formatMessage({ id: "Settings_Screen.appInfo.appVersion" }),
      description: intl.formatMessage(
        {
          id: "Settings_Screen.appInfo.appVersionDescription",
        },
        {
          appVersion: DeviceInfo.getVersion(),
          appBuildNumber: DeviceInfo.getBuildNumber(),
          devProdLabel: __DEV__ ? " _dev_" : " _prod_",
        }
      ),
    },
    {
      title: intl.formatMessage({ id: "Settings_Screen.appInfo.appBundleId" }),
      description: DeviceInfo.getBundleId(),
    },
    {
      title: intl.formatMessage({ id: "Settings_Screen.appInfo.codepushVersion" }),
      description: intl.formatMessage({ id: "Settings_Screen.appInfo.codepushVersionDescription" }),
    },
    {
      title: intl.formatMessage({ id: "Settings_Screen.appInfo.targetDevice" }),
      description: intl.formatMessage(
        {
          id: "Settings_Screen.appInfo.targetDeviceDescription",
        },
        {
          deviceType: DeviceInfo.getDeviceType(),
          apiLevel: Platform.OS === "android" ? `| ${apiLevel}` : "",
        }
      ),
    },
  ];

  return (
    <Accordion
      accordionTitle={intl.formatMessage({ id: "Settings_Screen.appInfo.title" })}
      accordionData={accordionData}
    />
  );
};
