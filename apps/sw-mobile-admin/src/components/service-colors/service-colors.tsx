import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ServiceColorType } from "@shortwaits/shared-lib";

import { getDimensions } from "../../theme";
import { Button, ButtonProps } from "../common";
import { useMobileAdmin } from "../../store";

interface ServiceColorsProps {
  color?: ServiceColorType;
  onSelect(arg: ServiceColorType): void;
}
interface CircleProps extends ButtonProps {
  width: number;
  color: string;
  isSelected: boolean | null;
  isDefault?: boolean;
  onSelect(): void;
}

function Circle({
  width: circleDiameter,
  color,
  isSelected,
  isDefault = false,
  onSelect,
}: CircleProps) {
  const style: ViewStyle = {
    backgroundColor: color,
    width: circleDiameter,
    height: circleDiameter,
    borderRadius: circleDiameter * 0.5,
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Button preset="none" style={style} onPress={onSelect}>
      {isSelected && (
        <Icon name="check-bold" size={circleDiameter - 5} color="white" />
      )}
    </Button>
  );
}

export function ServiceColors({ color, onSelect }: ServiceColorsProps) {
  const mobileAdminData = useMobileAdmin();

  const { width } = getDimensions(87);

  const colorsNumber: number = mobileAdminData
    ? Object.keys(mobileAdminData?.defaultData?.serviceColors).length
    : 0;

  const circleWidth = width / (colorsNumber * 1.9);

  if (!mobileAdminData) return null;
  if (!color) return null;

  return (
    <View style={[styles.container, { width }]}>
      {Object.keys(mobileAdminData.defaultData?.serviceColors).map(elem => (
        <Circle
          key={mobileAdminData.defaultData?.serviceColors[elem].colorId}
          onSelect={() =>
            onSelect(mobileAdminData.defaultData?.serviceColors[elem])
          }
          width={circleWidth}
          color={
            mobileAdminData.defaultData?.serviceColors[elem].hexCode ??
            "#ffffff"
          }
          isSelected={
            mobileAdminData.defaultData?.serviceColors[elem].colorId ===
            color?.colorId
          }
          isDefault={false}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
