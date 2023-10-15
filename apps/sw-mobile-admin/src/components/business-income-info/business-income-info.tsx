import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Menu, IconButton } from "react-native-paper";
import { useTheme } from "../../theme";
import { Text } from "../common";
import { Graph } from "../graph/graph";
import { GraphData, GraphIdentifier, getGraphCoordinates } from "../graph/graph-utils";
import { useIntl } from "react-intl";

export type BusinessIncomeInfoProps = {
  data: GraphData;
  isLoading?: boolean;
  error?: any;
};

function BusinessIncomeInfoComponent({ data, isLoading, error }: BusinessIncomeInfoProps) {
  const { Colors } = useTheme();
  const [visible, setVisible] = useState<boolean>(false);
  const [graphMode, setGraphMode] = useState<GraphIdentifier>("Week");
  const intl = useIntl();

  if (error || !data) {
    return (
      <View style={{ alignItems: "center" }}>
        <Text text="Error loading data" />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {isLoading ? (
        <Text>...</Text>
      ) : (
        <View
          style={[
            styles.graphTopBar,
            {
              backgroundColor: Colors.brandAccent1,
            },
          ]}
        >
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
            anchor={<IconButton onPress={() => setVisible(true)} icon={"dots-vertical"} color={Colors.text} />}
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
