import React from "react";
import { StyleSheet } from "react-native";
import { noop } from "lodash";

import { Card, Container, MultiSlider, Space, Text } from "../common";
import { getPrettyStringFromDurationInMin } from "../../utils/time";

export interface TimeDurationCardProps {
  title: string;
  values?: number[];
  onValuesChange(values?: number[]): void;
}
export const DurationFieldCard = (props: TimeDurationCardProps) => {
  const { title, values, onValuesChange = noop } = props;

  return (
    <Card mode="static">
      <Space size="small" />
      <Container direction="row" justifyContent="space-between">
        <Text preset="cardTitle" text={title} />
        <Text preset="cardTitle" text={getPrettyStringFromDurationInMin(values ? values[0] : 0)} />
      </Container>
      <MultiSlider style={styles.multiSlider} values={values} type="day" onValuesChange={onValuesChange} />
      <Space size="tiny" />
    </Card>
  );
};
const styles = StyleSheet.create({
  multiSlider: {
    alignSelf: "center",
  },
});
