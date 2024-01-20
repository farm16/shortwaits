import { noop } from "lodash";
import React from "react";

import { Card, Text, Space, Slider, Container } from "../..";

export const DurationFormInput = ({
  title,
  minimumValue = 0,
  maximumValue = 100,
  onValueChange = noop,
  value = 15,
}) => {
  return (
    <Card mode="text-field" style={{ marginTop: 15 }}>
      <Container direction="row" justifyContent="space-between">
        <Text preset="cardTitle" text={title} />
        <Text preset="cardSubtitle" text={value.toString()} />
      </Container>
      <Space size="tiny" />
      <Slider value={value} minimumValue={minimumValue} maximumValue={maximumValue} onValueChange={onValueChange} />
    </Card>
  );
};
