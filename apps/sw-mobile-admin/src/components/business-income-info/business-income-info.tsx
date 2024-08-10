import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Graph, GraphIdentifier, Text, getGraphCoordinates, useTheme } from "@shortwaits/shared-ui";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { StyleSheet, View } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { useGetBusinessEventSummaryQuery } from "../../services";
import { useBusiness } from "../../store";

// export type BusinessIncomeInfoProps = {};

function BusinessIncomeInfoComponent() {
  const business = useBusiness();

  const { data, isLoading, error } = useGetBusinessEventSummaryQuery(business?._id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const { Colors } = useTheme();
  const [visible, setVisible] = useState<boolean>(false);
  const [graphMode, setGraphMode] = useState<GraphIdentifier>("Week");
  const intl = useIntl();

  if (error || !data) {
    return null;
  }

  return (
    <View style={styles.root}>
      {isLoading ? (
        <Text>...</Text>
      ) : (
        <View style={[styles.graphTopBar]}>
          <Text
            preset="textSmall"
            style={{ fontWeight: "500" }}
            text={`${intl.formatMessage(
              { id: "MyBusiness_screen.totalIncome" },
              {
                period: graphMode,
              }
            )}${"$"}${getGraphCoordinates(data, graphMode)
              .reduce((pre, cur) => pre + cur.y, 0)
              .toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}`}
          />
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={<IconButton onPress={() => setVisible(true)} icon={"dots-vertical"} iconColor={Colors.brandSecondary} />}
          >
            {Object.keys(data).map((name: GraphIdentifier) => {
              return (
                <Menu.Item
                  key={name}
                  titleStyle={{
                    fontWeight: "normal",
                    color: Colors.text,
                  }}
                  onPress={() => {
                    setGraphMode(name);
                    setVisible(false);
                  }}
                  title={intl.formatMessage({
                    id: `Common.${name.toLowerCase()}`,
                  })}
                />
              );
            })}
          </Menu>
        </View>
      )}
      <Graph timeIdentifier={graphMode} data={data} isLoading={isLoading} />
    </View>
  );
}

export const BusinessIncomeInfo = React.memo(BusinessIncomeInfoComponent);

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  graphTopBar: {
    paddingVertical: 16,
    justifyContent: "space-between",
    paddingLeft: 16,
    alignItems: "center",
    flexDirection: "row",
  },
});
