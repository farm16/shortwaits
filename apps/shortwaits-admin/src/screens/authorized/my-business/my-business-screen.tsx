import React, { FC, useLayoutEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { truncate } from "lodash";

import {
  ButtonCard,
  CircleIconButton,
  Container,
  Graph,
  MembershipCard,
  Screen,
  Space,
  Text,
} from "../../../components";
import { useTheme } from "../../../theme";
import { IconButton, Menu } from "react-native-paper";
import { useBusiness } from "../../../redux";
import { AuthorizedScreenProps } from "../../../navigation";
import { getSampleGraphData } from "./utils";

export const MyBusinessScreen: FC<
  AuthorizedScreenProps<"my-business-screen">
> = ({ navigation }) => {
  const business = useBusiness();
  const { Colors } = useTheme();
  const graphData = useMemo(() => getSampleGraphData(), []);
  const [graphDataType, setGraphDataType] =
    useState<keyof typeof graphData>("week");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Container direction="row" alignItems="center">
            <CircleIconButton iconType="business-header" disabled />
            <Text
              preset="headerTitle"
              text={truncate(business.shortName, { length: 16 })}
            />
          </Container>
        );
      },
      headerRight: () => {
        return (
          <Container direction="row" alignItems="center">
            <CircleIconButton marginRight iconType="edit" />
            <CircleIconButton marginRight iconType="share" />
          </Container>
        );
      },
    });
  }, [business.shortName, navigation]);

  const [visible, setVisible] = useState<boolean>(false);

  const graphTopBar = (
    <View
      style={[
        styles.graphBar,
        { backgroundColor: Colors.staticLightBackground },
      ]}
    >
      <Text
        preset="textSmall"
        style={{ fontWeight: "500" }}
        text={`Total ${graphDataType}'s income: ${graphData[graphDataType].data
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
          <IconButton onPress={() => setVisible(true)} icon={"dots-vertical"} />
        }
      >
        {Object.keys(graphData).map((name) => {
          return (
            <Menu.Item
              titleStyle={{
                fontWeight: graphDataType === name ? "bold" : "normal",
                color:
                  graphDataType === name ? Colors.brandSecondary : Colors.text,
              }}
              onPress={() => {
                setGraphDataType(name as keyof typeof graphData);
                setVisible(false);
              }}
              title={name}
            />
          );
        })}
      </Menu>
    </View>
  );

  return (
    <>
      {graphTopBar}
      <Screen
        preset="scroll"
        style={{ alignItems: "center", paddingTop: 10 }}
        unsafe
        // stickyHeaderIndices={[0]}
      >
        <Graph
          displayOptions={graphData[graphDataType].displayOptions}
          data={graphData[graphDataType].data}
        />
        <Space size="small" />
        <MembershipCard business={business} />
        <Space size="tiny" />
        <ButtonCard
          leftIconName="account-tie"
          leftIconColor={Colors.brandSecondary6}
          title={"Staff"}
        />
        <ButtonCard
          leftIconName="layers-triple"
          leftIconColor={Colors.brandSecondary6}
          title={"Services"}
        />
        <ButtonCard
          leftIconName="cash-fast"
          leftIconColor={Colors.brandSecondary6}
          title={"Payments"}
        />
        <ButtonCard
          leftIconName="puzzle"
          leftIconColor={Colors.brandSecondary6}
          title={"Integrations"}
        />
        <ButtonCard
          leftIconName="message-star"
          leftIconColor={Colors.brandSecondary6}
          title={"Reviews"}
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  graphBar: {
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
