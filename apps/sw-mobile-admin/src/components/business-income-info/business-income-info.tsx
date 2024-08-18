import { skipToken } from "@reduxjs/toolkit/dist/query";
import { GraphIdentifier } from "@shortwaits/shared-lib";
import { Graph, Text, useTheme } from "@shortwaits/shared-ui";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { StyleSheet, View } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { useGetBusinessEventSummaryQuery } from "../../services";
import { useBusiness } from "../../store";

// export type BusinessIncomeInfoProps = {};

function BusinessIncomeInfoComponent() {
  const business = useBusiness();
  const { Colors } = useTheme();
  const intl = useIntl();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [eventTypeVisible, setEventTypeVisible] = useState<boolean>(false);

  const [graphMode, setGraphMode] = useState<GraphIdentifier>("Week");
  const [countType, setCountType] = useState<"eventCount" | "revenueCount">("revenueCount");

  const {
    data: eventSummaryQuery,
    isLoading,
    error,
  } = useGetBusinessEventSummaryQuery(business?._id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  if (!eventSummaryQuery?.data) {
    return null;
  }

  let totalCount = 0;

  Object.keys(eventSummaryQuery.data.graphData[graphMode]).forEach(key => {
    totalCount += eventSummaryQuery.data.graphData[graphMode][key][countType];
  });

  return (
    <View style={styles.root}>
      {isLoading ? (
        <Text>...</Text>
      ) : (
        <View style={[styles.graphTopBar]}>
          <View style={{ flex: 1 }}>
            <Text preset="textSmall" style={{ fontWeight: "500", marginBottom: 4 }} text={graphMode} />
            <Text
              preset="textSmall"
              text={intl.formatMessage(
                {
                  id: `MyBusiness_screen.${countType}`,
                },
                {
                  count: countType === "revenueCount" ? `${totalCount / 100}` : totalCount,
                  period: graphMode,
                }
              )}
            />
          </View>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                style={
                  {
                    // backgroundColor: "green",
                  }
                }
                onPress={() => setMenuVisible(true)}
                icon={"calendar"}
                iconColor={Colors.brandSecondary}
              />
            }
          >
            {Object.keys(eventSummaryQuery.data.graphData).map((name: GraphIdentifier) => {
              return (
                <Menu.Item
                  key={name}
                  titleStyle={{
                    fontWeight: "normal",
                    color: Colors.text,
                  }}
                  onPress={() => {
                    setGraphMode(name);
                    setMenuVisible(false);
                  }}
                  title={intl.formatMessage({
                    id: `Common.${name.toLowerCase()}`,
                  })}
                />
              );
            })}
          </Menu>
          <Menu
            visible={eventTypeVisible}
            onDismiss={() => setEventTypeVisible(false)}
            anchor={
              <IconButton
                style={{
                  // backgroundColor: "red",
                  margin: 0,
                }}
                onPress={() => setEventTypeVisible(true)}
                icon={"dots-vertical"}
                iconColor={Colors.brandSecondary}
              />
            }
          >
            {["revenueCount", "eventCount"].map((countType: "revenueCount" | "eventCount") => {
              return (
                <Menu.Item
                  key={countType}
                  titleStyle={{
                    fontWeight: "normal",
                    color: Colors.text,
                  }}
                  onPress={() => {
                    setCountType(countType);
                    setEventTypeVisible(false);
                  }}
                  title={countType === "revenueCount" ? "Revenue by time" : "Events by time"}
                />
              );
            })}
          </Menu>
        </View>
      )}
      <Graph timeIdentifier={graphMode} data={eventSummaryQuery.data.graphData} isLoading={isLoading} countType={countType} />
    </View>
  );
}

export const BusinessIncomeInfo = React.memo(BusinessIncomeInfoComponent);

const styles = StyleSheet.create({
  root: {
    // width: "100%",
  },
  graphTopBar: {
    // paddingVertical: 16,
    paddingVertical: 8,
    paddingLeft: 16,
    alignItems: "center",
    flexDirection: "row",
  },
});
