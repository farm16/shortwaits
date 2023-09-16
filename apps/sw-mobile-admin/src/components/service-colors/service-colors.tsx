import React, { useCallback, useMemo } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ServiceColorType } from "@shortwaits/shared-lib";

import { getDimensions } from "../../theme";
import { Button, ButtonProps } from "../common";
import { useMobileAdmin } from "../../store";

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
    const colorsCount = mobileAdminData ? Object.keys(mobileAdminData?.defaultData?.serviceColors).length : 0;
    const circleWidth = width / (colorsCount * 1.9);

    return Object.keys(mobileAdminData.defaultData?.serviceColors).map(elem => (
      <Circle
        key={mobileAdminData.defaultData?.serviceColors[elem].colorId}
        onSelect={() => handleOnSelect(mobileAdminData.defaultData?.serviceColors[elem])}
        width={circleWidth}
        color={mobileAdminData.defaultData?.serviceColors[elem].hexCode ?? "#ffffff"}
        isSelected={mobileAdminData.defaultData?.serviceColors[elem].colorId == selectedColor?.colorId}
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
