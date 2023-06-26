import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Menu, IconButton } from "react-native-paper";
import { useTheme } from "../../theme";
import { Text } from "../common";
import { Graph } from "../graph/graph";
import {
  GraphData,
  GraphIdentifier,
  getGraphCoordinates,
} from "../graph/graph-utils";
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

export type BusinessIncomeInfoProps = {
  data: GraphData;
  isLoading?: boolean;
  error?: any;
};

function BusinessIncomeInfoComponent({
  data,
  isLoading,
  error,
}: BusinessIncomeInfoProps) {
  const { Colors } = useTheme();
  const [visible, setVisible] = useState<boolean>(false);
  const [graphMode, setGraphMode] = useState<GraphIdentifier>("Week");

  if (error) {
    return (
      <View style={{ alignItems: "center" }}>
        <Text text="Error loading data" />
      </View>
    );
  }

  return (
    <View style={{ alignItems: "center" }}>
      {isLoading ? (
        <Placeholder Animation={Fade}>
          <PlaceholderLine width={80} />
        </Placeholder>
      ) : (
        <View
          style={[
            styles.graphTopBar,
            {
              height: 45,
              backgroundColor: Colors.staticLightBackground,
            },
          ]}
        >
          <Text
            preset="textSmall"
            style={{ fontWeight: "500" }}
            text={`${graphMode}'s total income: $${getGraphCoordinates(
              data,
              graphMode
            )
              .reduce((pre, cur) => pre + cur.y, 0)
              .toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}`}
          />
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <IconButton
                onPress={() => setVisible(true)}
                icon={"dots-vertical"}
              />
            }
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
                  title={name}
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
  graphTopBar: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    justifyContent: "space-between",
  },
  graphBarButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "flex-end",
  },
});
