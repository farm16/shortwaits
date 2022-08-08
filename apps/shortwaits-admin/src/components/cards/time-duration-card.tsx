import React, { useState } from "react";

import { Card, MultiSlider, Text } from "../common";
import { useTheme } from "@shortwaits/admin/theme";
import { getPrettyStringFromDurationInMin } from "@shortwaits/admin/utils/time";
import { noop } from "lodash";
import { StyleSheet } from "react-native";

export interface TimeDurationCardProps {
  title: string;
  values?: number[];
  onValuesChange(values?: number[]): void;
}
export const TimeDurationCard = (props: TimeDurationCardProps) => {
  const { title, values, onValuesChange = noop } = props;
  const {
    Colors,
    Common: { textFieldPresets },
  } = useTheme();

  return (
    <Card mode="static" style={styles.container}>
      <Text preset="cardTitle" text={title} />
      <Text
        preset="none"
        style={[textFieldPresets.cardSubtitle, styles.cardSubtile]}
        text={getPrettyStringFromDurationInMin(values ? values[0] : 0)}
      />
      <MultiSlider
        style={styles.multiSlider}
        values={values}
        step={15}
        min={0}
        max={1440}
        onValuesChange={onValuesChange}
      />
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 110,
  },
  multiSlider: {
    marginLeft: -10, // this is because there is a margin of 15 for any childrem inside a card
    alignSelf: "center",
  },
  cardSubtile: {
    marginLeft: -10, // this is because there is a margin of 15 for any childrem inside a card
    alignSelf: "center",
  },
});
