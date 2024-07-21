import { BackButton, Screen, Text, useTheme } from "@shortwaits/shared-ui";
import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl"; // Import FormattedMessage and useIntl
import { Platform, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
import { List } from "react-native-paper";
import { shortwaitsApi } from "../../../configs";
import { AuthorizedScreenProps } from "../../../navigation";

const appName = DeviceInfo.getApplicationName();
const appVersion = DeviceInfo.getVersion();
const appBuildNumber = DeviceInfo.getBuildNumber();
const appBundleId = DeviceInfo.getBundleId();
const deviceType = DeviceInfo.getDeviceType();
const privacyPolicyUrl = `${shortwaitsApi.baseUrl}/shortwaits/privacy-policy`;
const termsOfServiceUrl = `${shortwaitsApi.baseUrl}/shortwaits/terms-of-use`;

export const AppInfoScreen: FC<AuthorizedScreenProps<"app-info-screen">> = ({ navigation }) => {
  const { Colors } = useTheme();
  const intl = useIntl(); // Access the intl object
  const [apiLevel, setApiLevel] = useState(0);
  const itemStyle = {
    borderColor: Colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerTitle: () => <Text preset="headerTitle" text={"App Information"} />,
    });
  }, [intl, navigation]);

  useEffect(() => {
    if (Platform.OS === "android") {
      DeviceInfo.getApiLevel().then(apiLevel => {
        setApiLevel(apiLevel);
      });
    } else {
      return;
    }
  }, []);

  return (
    <Screen preset="scroll" unsafeBottom unsafe>
      <List.Section>
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title={<FormattedMessage id="Settings_Screen.appInfo.appName" />}
          description={appName}
        />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title={<FormattedMessage id="Settings_Screen.appInfo.appVersion" />}
          description={intl.formatMessage(
            {
              id: "Settings_Screen.appInfo.appVersionDescription",
            },
            {
              appVersion: appVersion,
              appBuildNumber: appBuildNumber,
              devProdLabel: __DEV__ ? " _dev_" : " _prod_",
            }
          )}
        />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title={<FormattedMessage id="Settings_Screen.appInfo.appBundleId" />}
          description={appBundleId}
        />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title={<FormattedMessage id="Settings_Screen.appInfo.codepushVersion" />}
          description={""}
        />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title={<FormattedMessage id="Settings_Screen.appInfo.targetDevice" />}
          description={intl.formatMessage(
            {
              id: "Settings_Screen.appInfo.targetDeviceDescription",
            },
            {
              deviceType: deviceType,
              apiLevel: Platform.OS === "android" ? `| ${apiLevel}` : "",
            }
          )}
        />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title={"Terms of Service"}
          onPress={() => {
            navigation.navigate("modals", {
              screen: "webview-modal-screen",
              params: {
                uri: termsOfServiceUrl,
                header: "Terms of Service",
              },
            });
          }}
          right={props => <List.Icon {...props} color={Colors.brandPrimary} icon="chevron-right" />}
        />
        <List.Item
          descriptionStyle={{ color: Colors.subText }}
          titleStyle={{
            color: Colors.text,
          }}
          style={itemStyle}
          title={"Privacy Policy"}
          onPress={() => {
            navigation.navigate("modals", {
              screen: "webview-modal-screen",
              params: {
                uri: privacyPolicyUrl,
                header: "Privacy Policy",
              },
            });
          }}
          right={props => <List.Icon {...props} color={Colors.brandPrimary} icon="chevron-right" />}
        />
      </List.Section>
    </Screen>
  );
};
