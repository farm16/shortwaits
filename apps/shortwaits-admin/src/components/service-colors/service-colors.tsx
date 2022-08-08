import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ServiceColorType } from "@shortwaits/shared-types";

import { getDimensions } from "@shortwaits/admin/theme";
import { Button, ButtonProps } from "../common";
import { useMobileAdmin } from "@shortwaits/admin/hooks/useMobileAdmin";

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
  const defaultData = useMobileAdmin();

  const { width } = getDimensions(87);

  const colorsSize: number = defaultData
    ? Object.keys(defaultData.serviceColors).length
    : 0;

  const circleWidth = width / (colorsSize * 1.9);

  if (!defaultData) return null;
  if (!color) return null;

  return (
    <View style={[styles.container, { width }]}>
      {Object.keys(defaultData?.serviceColors ?? []).map((elem) => (
        <Circle
          key={defaultData?.serviceColors[elem].colorId}
          onSelect={() => onSelect(defaultData?.serviceColors[elem])}
          width={circleWidth}
          color={defaultData?.serviceColors[elem].hexCode ?? "#ffffff"}
          isSelected={
            defaultData?.serviceColors[elem].colorId === color?.colorId
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
