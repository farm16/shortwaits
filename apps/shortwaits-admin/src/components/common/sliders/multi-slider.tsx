import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import MultiSlider, {
  MultiSliderProps,
} from "@ptomasroos/react-native-multi-slider";
import { getDimensions, useTheme } from "@shortwaits/admin/theme";

interface MultiSliderComponentProps extends MultiSliderProps {
  style?: ViewStyle;
}

export const MultiSliderComponent = (props: MultiSliderComponentProps) => {
  const {
    onValuesChange,
    style: styleOverride,
    step,
    min,
    max,
    allowOverlap = false,
    values,
    ...rest
  } = props;
  const { width } = getDimensions(80);
  const { Colors } = useTheme();

  const containerStyle = StyleSheet.flatten([
    styles.container,
    { width: width },
    styleOverride,
  ]);
  const markerStyle = StyleSheet.flatten([
    styles.marker,
    { backgroundColor: Colors.brandPrimary },
  ]);

  return (
    <MultiSlider
      containerStyle={containerStyle}
      markerStyle={markerStyle}
      trackStyle={styles.track}
      pressedMarkerStyle={styles.pressedMarker}
      selectedStyle={{ backgroundColor: Colors.brandPrimary3 }}
      unselectedStyle={{ backgroundColor: Colors.lightGray }}
      onValuesChange={onValuesChange}
      allowOverlap={allowOverlap}
      values={values}
      min={min}
      max={max}
      step={step}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 30,
    marginHorizontal: 0,
    marginVertical: 5,
    paddingHorizontal: 0,
  },
  track: {
    height: 3.5,
    borderRadius: 3.5 / 2,
  },
  selected: {},
  unselected: {},
  pressedMarker: {
    height: 25,
    width: 25,
  },
  marker: {
    height: 20,
    width: 20,
    top: 1.5,
  },
});

/**
 * PROPS !!!
 * values?: number[];
 *
 * onValuesChange?: (values: number[]) => void;
 * onValuesChangeStart?: () => void;
 * onValuesChangeFinish?: (values: number[]) => void;
 *
 ?: number;
 * touchDimensions?: {
 *     height: number;
 *     width: number;
 *     borderRadius: number;
 *     slipDisplacement: number;
 * };
 *
 * customMarker?: React.ComponentType<MarkerProps>;
 * customMarkerLeft?: React.ComponentType<MarkerProps>;
 * customMarkerRight?: React.ComponentType<MarkerProps>;
 * customLabel?: React.ComponentType<LabelProps>;
 *
 * isMarkersSeparated?: boolean;
 *
 * min?: number;
 * max?: number;
 * step?: number;
 *
 * optionsArray?: number[];
 *
 * containerStyle?: ViewStyle;
 * trackStyle?: ViewStyle;
 * selectedStyle?: ViewStyle;
 * unselectedStyle?: ViewStyle;
 * markerContainerStyle?: ViewStyle;
 * markerStyle?: ViewStyle;
 * pressedMarkerStyle?: ViewStyle;
 * valuePrefix?: string;
 * valueSuffix?: string;
 * enabledOne?: boolean;
 * enabledTwo?: boolean;
 * onToggleOne?: () => void;
 * onToggleTwo?: () => void;
 * allowOverlap?: boolean;
 * snapped?: boolean;
 * markerOffsetX?: number;
 * markerOffsetY?: number;
 * minMarkerOverlapDistance?: number;
 * imageBackgroundSource?: string;
 * enableLabel?: boolean;
 * vertical?: boolean;
 *
 * **/
