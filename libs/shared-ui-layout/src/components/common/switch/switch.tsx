import React, { ForwardedRef } from "react";
import { Switch as RNSwitch } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "../../../theme";

// component switch with fowardRef and memo with customizes colors
type SwitchProps = {
  isLoading?: boolean;
} & React.ComponentProps<typeof RNSwitch>;

export const Switch = React.memo(
  React.forwardRef((props: SwitchProps, ref: ForwardedRef<RNSwitch>) => {
    const { Colors } = useTheme();
    const { value, isLoading, disabled } = props;
    const isDisabled = isLoading || disabled;
    if (isLoading) {
      return <ActivityIndicator size="small" />;
    }
    return (
      <RNSwitch
        disabled={isDisabled}
        ref={ref}
        value={value}
        {...props}
        thumbColor={props.value ? Colors.green1 : Colors.red1}
        trackColor={{ false: Colors.red3, true: Colors.green3 }}
        ios_backgroundColor={isDisabled ? "#ddd" : Colors.red3}
        {...(isDisabled && {
          thumbColor: "#fff",
          trackColor: { false: Colors.gray, true: Colors.gray },
        })}
      />
    );
  })
);
