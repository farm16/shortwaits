import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { noop } from "lodash";

import { Card, MultiSlider, Space, Text } from "../common";
import { useTheme } from "../../theme";
import { getPrettyStringFromDurationInMin } from "../../utils/time";

export interface TimeDurationCardProps {
  title: string;
  values?: number[];
  onValuesChange(values?: number[]): void;
}
export const DurationFieldCard = (props: TimeDurationCardProps) => {
  const { title, values, onValuesChange = noop } = props;
  const {
    Colors,
    Common: { textFieldPresets },
  } = useTheme();

  return (
    <Card mode="static" style={styles.container}>
      <Space size="small" />
      <Text preset="cardTitle" text={title} />
      <MultiSlider
        style={styles.multiSlider}
        values={values}
        step={15}
        min={0}
        max={1440}
        onValuesChange={onValuesChange}
      />
      <Text
        preset="none"
        style={[textFieldPresets.cardSubtitle, styles.cardSubtile]}
        text={getPrettyStringFromDurationInMin(values ? values[0] : 0)}
      />
      <Space size="tiny" />
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    minHeight: undefined,
    maxHeight: undefined,
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
