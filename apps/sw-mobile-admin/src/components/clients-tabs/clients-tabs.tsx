import { IconButton, Logo3, Text, getResponsiveHeight, useTheme } from "@shortwaits/shared-ui";
import React, { FC, useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { Alert, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Route, SceneMap, TabBarProps, TabView } from "react-native-tab-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Tooltip from "react-native-walkthrough-tooltip";

type ClientsTabsProps = {
  onTabChange?: (index: number) => void;
  renderShortwaitsClientsTab: () => JSX.Element;
  renderLocalClientsTab: () => JSX.Element;
};

export const ClientsTabs: FC<ClientsTabsProps> = props => {
  const { renderShortwaitsClientsTab, renderLocalClientsTab, onTabChange } = props;
  const intl = useIntl();
  const { Colors } = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const [isClientToolTipVisible, setIsClientToolTipVisible] = useState(false);
  const [isLocalClientToolTipVisible, setIsLocalClientToolTipVisible] = useState(false);

  const routes = useMemo(() => {
    return [
      {
        key: "shortwaits",
        title: intl.formatMessage({ id: "Clients_screen.tab.shortwaits" }),
      },
      {
        key: "local",
        title: intl.formatMessage({ id: "Clients_screen.tab.devices" }),
      },
    ];
  }, [intl]);

  const _renderScene = SceneMap({
    shortwaits: renderShortwaitsClientsTab,
    local: renderLocalClientsTab,
  });

  const _renderTabBar = useCallback(
    (tabBarProps: TabBarProps<Route>) => {
      const backgroundColor = Colors.brandPrimary1;
      const indicatorColor = Colors.brandAccent2;
      const iconColor = Colors.brandPrimary;
      const iconDisabledColor = Colors.disabledText;
      const disabledBackgroundColor = Colors.disabledBackground;
      const disabledIndicatorColor = Colors.disabledBackground;
      const isClientsSelected = tabBarProps.navigationState.index === 0;
      const isLocalClientsSelected = tabBarProps.navigationState.index === 1;

      const handleTabChange = (index: number) => {
        setTabIndex(index);
        if (onTabChange) {
          onTabChange(index);
        }
      };

      return (
        <View style={styles.tabBarRoot}>
          <TouchableOpacity
            onPress={() => handleTabChange(0)}
            style={[
              styles.tabButton,
              {
                backgroundColor: isClientsSelected ? backgroundColor : disabledBackgroundColor,
                borderBottomColor: isClientsSelected ? indicatorColor : disabledIndicatorColor,
                borderBottomWidth: isClientsSelected ? getResponsiveHeight(4) : 0,
              },
            ]}
          >
            <Tooltip
              isVisible={isClientToolTipVisible}
              closeOnChildInteraction
              contentStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
              content={
                <View>
                  <Text>
                    <Text text={"Shortwaits clients holds all your clients that were added using the "} />
                    <Text
                      preset="textLinkLarge"
                      text="Shortwaits App"
                      onPress={() => {
                        Alert.alert("Shortwaits App");
                      }}
                    />
                    <Text text="." />
                  </Text>
                </View>
              }
              placement="bottom"
              onClose={() => setIsClientToolTipVisible(false)}
            >
              <Logo3
                style={{
                  alignSelf: "center",
                }}
                height={37}
                width={37}
                color={isClientsSelected ? iconColor : iconDisabledColor}
              />
            </Tooltip>
            <IconButton
              style={{
                position: "absolute",
                right: 12,
                top: 4,
              }}
              iconColor="black7"
              iconType="information"
              onPress={() => {
                setIsClientToolTipVisible(true);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              {
                backgroundColor: isLocalClientsSelected ? backgroundColor : disabledBackgroundColor,
                borderBottomColor: isLocalClientsSelected ? indicatorColor : disabledIndicatorColor,
                borderBottomWidth: isLocalClientsSelected ? getResponsiveHeight(4) : 0,
              },
            ]}
            onPress={() => handleTabChange(1)}
          >
            <Tooltip
              isVisible={isLocalClientToolTipVisible}
              closeOnChildInteraction
              contentStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
              content={
                <View>
                  <Text>The Address book holds your local clients that were added manually using the Shortwaits Admin App.</Text>
                </View>
              }
              placement="bottom"
              onClose={() => setIsLocalClientToolTipVisible(false)}
            >
              <Icon name={"card-account-details"} size={getResponsiveHeight(25)} color={isLocalClientsSelected ? iconColor : iconDisabledColor} />
            </Tooltip>
            <IconButton
              style={{
                position: "absolute",
                right: 12,
                top: 4,
              }}
              iconColor="black7"
              iconType="information"
              onPress={() => {
                setIsLocalClientToolTipVisible(true);
              }}
            />
          </TouchableOpacity>
        </View>
      );
    },
    [
      Colors.brandAccent2,
      Colors.brandPrimary,
      Colors.brandPrimary1,
      Colors.disabledBackground,
      Colors.disabledText,
      isClientToolTipVisible,
      isLocalClientToolTipVisible,
      onTabChange,
    ]
  );

  return (
    <TabView
      renderTabBar={_renderTabBar}
      navigationState={{ index: tabIndex, routes }}
      renderScene={_renderScene}
      onIndexChange={setTabIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
    />
  );
};

const styles = StyleSheet.create({
  tabBarRoot: {
    flexDirection: "row",
    height: getResponsiveHeight(47),
  },
  tab: {
    flex: 1,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
