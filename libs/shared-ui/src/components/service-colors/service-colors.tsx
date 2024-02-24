import { ServiceColorType, ServiceColorsType } from "@shortwaits/shared-lib";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getDimensions } from "../../theme";
import { Button, ButtonProps } from "../common";

interface ServiceColorsProps {
  serviceColors: ServiceColorsType;
  selectedColor?: ServiceColorType;
  onSelect(arg: ServiceColorType): void;
}
interface CircleProps extends ButtonProps {
  width: number;
  color: string;
  isSelected: boolean | null;
  isDefault?: boolean;
  onSelect(): void;
}

function Circle({ width: circleDiameter, color, isSelected, onSelect }: CircleProps) {
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
      {isSelected && <Icon name="check-bold" size={circleDiameter - 5} color="white" />}
    </Button>
  );
}

export function ServiceColors({ selectedColor, onSelect, serviceColors }: ServiceColorsProps) {
  const handleOnSelect = useCallback(
    (item: ServiceColorType) => {
      if (onSelect) onSelect(item);
    },
    [onSelect]
  );

  const circles = useMemo(() => {
    const { width } = getDimensions(87);
    const colorsCount = serviceColors ? Object.keys(serviceColors).length : 0;
    const circleWidth = width / (colorsCount * 1.9);

    return Object.keys(serviceColors).map(elem => (
      <Circle
        key={serviceColors[elem].colorId}
        onSelect={() => handleOnSelect(serviceColors[elem])}
        width={circleWidth}
        color={serviceColors[elem].hexCode ?? "#ffffff"}
        isSelected={serviceColors[elem].colorId === selectedColor?.colorId}
      />
    ));
  }, [handleOnSelect, selectedColor?.colorId, serviceColors]);

  if (!serviceColors) return null;

  return <View style={[styles.root]}>{circles}</View>;
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
