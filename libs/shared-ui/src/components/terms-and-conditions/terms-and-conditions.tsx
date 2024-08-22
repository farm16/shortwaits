import React from "react";
import { Button, Text } from "../common";
import { StyleProp, ViewStyle } from "react-native";

type TermsAndConditionsProps = {
  onPress?(): void;
  style?: StyleProp<ViewStyle>;
};
export const TermsAndConditions: React.FC<TermsAndConditionsProps> = props => {
  const { onPress, style } = props;

  const navigateToTermsAndConditions = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Button preset="link" onPress={() => navigateToTermsAndConditions()} style={style}>
      <Text text="T&C" preset="link" />
    </Button>
  );
};
