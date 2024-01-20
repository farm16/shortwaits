import { ServiceColorType } from "@shortwaits/shared-utils";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useMobileAdmin } from "../../store";
import { getDimensions } from "../../theme";
import { Button, ButtonProps } from "../common";

interface ServiceColorsProps {
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

function Circle({ width: circleDiameter, color, isSelected, isDefault = false, onSelect }: CircleProps) {
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

export function ServiceColors({ selectedColor, onSelect }: ServiceColorsProps) {
  const mobileAdminData = useMobileAdmin();

  const handleOnSelect = useCallback(
    color => {
      onSelect(color);
    },
    [onSelect]
  );

  const circles = useMemo(() => {
    const { width } = getDimensions(87);
    const colorsCount = mobileAdminData ? Object.keys(mobileAdminData?.shortwaits?.serviceColors).length : 0;
    const circleWidth = width / (colorsCount * 1.9);

    return Object.keys(mobileAdminData.shortwaits?.serviceColors).map(elem => (
      <Circle
        key={mobileAdminData.shortwaits?.serviceColors[elem].colorId}
        onSelect={() => handleOnSelect(mobileAdminData.shortwaits?.serviceColors[elem])}
        width={circleWidth}
        color={mobileAdminData.shortwaits?.serviceColors[elem].hexCode ?? "#ffffff"}
        isSelected={mobileAdminData.shortwaits?.serviceColors[elem].colorId == selectedColor?.colorId}
        isDefault={false}
      />
    ));
  }, [mobileAdminData, handleOnSelect, selectedColor]);

  if (!mobileAdminData) return null;

  return <View style={[styles.root]}>{circles}</View>;
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
