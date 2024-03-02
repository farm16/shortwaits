import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QrScannerModal, MODAL_SCREENS as SHARED_MODAL_SCREENS, useTheme } from "@shortwaits/shared-ui";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ExploreScreen, HomeScreen, SettingsScreen } from "../../screens";
import { AUTHORIZED_TAB_SCREENS } from "../navigation-constants";
import { AuthorizedTabsParamList } from "../navigation-types";

const { QR_SCANNER_MODAL_SCREEN } = SHARED_MODAL_SCREENS;
const Tab = createBottomTabNavigator<AuthorizedTabsParamList>();

export const AuthorizedTabNavigator = () => {
  const { Colors } = useTheme();

  const navigatorScreenOptions = useMemo<BottomTabNavigationOptions>(() => {
    return {
      unmountOnBlur: true,
      headerShown: false,
      animationEnabled: true,
      tabBarStyle: {
        backgroundColor: Colors.brandSecondary,
      },
      tabBarInactiveBackgroundColor: Colors.brandSecondary,
      tabBarActiveTintColor: Colors.white,
      tabBarInactiveTintColor: Colors.disabledText,
    };
  }, [Colors.brandSecondary, Colors.disabledText, Colors.white]);

  const scanButton = useCallback(
    props => {
      return (
        <TouchableOpacity
          {...props}
          style={{
            top: -20,
            width: 75,
            height: 75,
            borderRadius: 75 / 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.brandAccent,
            shadowColor: Colors.brandSecondary,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.white,
          }}
        >
          <MaterialCommunityIcons name={"qrcode-scan"} color={Colors.black} size={25} />
        </TouchableOpacity>
      );
    },
    [Colors.brandAccent, Colors.brandSecondary, Colors.black, Colors.white]
  );

  return (
    <Tab.Navigator initialRouteName={AUTHORIZED_TAB_SCREENS.HOME_SCREEN} screenOptions={navigatorScreenOptions}>
      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons name={focused ? "home" : "home-outline"} color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.EXPLORE_SCREEN}
        component={ExploreScreen}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons name={focused ? "compass" : "compass-outline"} color={color} size={25} />,
        }}
      />

      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.SCAN_SCREEN}
        component={QrScannerModal}
        options={{
          tabBarLabel: "Scan",
          tabBarButton: scanButton,
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate("modals", {
              screen: QR_SCANNER_MODAL_SCREEN,
              params: {
                title: "Scan QR Code",
                options: ["scanEventQr", "scanBusinessQr"],
              },
            });
          },
        })}
      />

      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.FAVORITES_SCREEN}
        component={ExploreScreen}
        options={{
          tabBarLabel: "My Favorites",
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons name={focused ? "heart" : "heart-outline"} color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name={AUTHORIZED_TAB_SCREENS.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused, color }) => <MaterialCommunityIcons name={focused ? "cog" : "cog-outline"} color={color} size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};
