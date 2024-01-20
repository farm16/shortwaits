import React, { useMemo, useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import PMultiSlider, { MultiSliderProps as PMultiSliderProps } from "@ptomasroos/react-native-multi-slider";
import { useTheme } from "../../../theme";
import { getPrettyStringFromDurationInMin, get12hrTimeFromDecimal } from "../../../utils";
import { Text } from "../text/text";
interface MultiSliderProps extends PMultiSliderProps {
  style?: ViewStyle;
  timeRange?: keyof typeof timeRanges;
  rangeMode?: keyof typeof rangeModes;
}

const timeRanges = {
  day: {
    min: 0,
    max: 1440,
    step: 15,
  },
  hour: {
    min: 0,
    max: 60,
    step: 1,
  },
} as const;

const rangeModes = {
  duration: {
    getString: getPrettyStringFromDurationInMin,
  },
  time: {
    getString: get12hrTimeFromDecimal,
  },
} as const;

export const MultiSlider = (props: MultiSliderProps) => {
  const {
    onValuesChange,
    style: styleOverride,
    step,
    min,
    max,
    allowOverlap = false,
    values,
    timeRange = "day",
    rangeMode = "duration",
  } = props;
  const { Colors } = useTheme();

  const containerStyle = StyleSheet.flatten([styles.container, styleOverride]);
  const markerStyle = StyleSheet.flatten([styles.marker, { backgroundColor: Colors.brandSecondary }]);
  const [isLabelEnabled, setIsLabelEnabled] = useState(false);
  return (
    <PMultiSlider
      enableLabel={isLabelEnabled}
      containerStyle={containerStyle}
      onValuesChangeStart={() => setIsLabelEnabled(true)}
      markerStyle={markerStyle}
      trackStyle={styles.track}
      customLabel={e => {
        let value;
        if (e.oneMarkerPressed) {
          value = Number(e.oneMarkerValue);
        } else if (e.twoMarkerPressed) {
          value = Number(e.twoMarkerValue);
        }
        return (
          <View
            style={{
              backgroundColor: Colors.brandSecondary,
              borderRadius: 5,
              minWidth: 150,
              paddingHorizontal: 10,
              paddingVertical: 5,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              position: "absolute",
              top: -40,
            }}
          >
            <Text
              preset="none"
              text={rangeModes[rangeMode].getString(value)}
              style={{
                color: Colors.white,
                fontSize: 18,
              }}
            />
          </View>
        );
      }}
      pressedMarkerStyle={styles.pressedMarker}
      selectedStyle={{ backgroundColor: Colors.brandSecondary3 }}
      unselectedStyle={{ backgroundColor: Colors.lightGray }}
      onValuesChangeFinish={values => {
        setIsLabelEnabled(false);
        onValuesChange && onValuesChange(values);
      }}
      allowOverlap={allowOverlap}
      values={values}
      min={timeRanges[timeRange]["min"]}
      max={timeRanges[timeRange]["max"]}
      step={timeRanges[timeRange]["step"]}
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
    width: "100%",
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
 * customMarker?: React.Type<MarkerProps>;
 * customMarkerLeft?: React.Type<MarkerProps>;
 * customMarkerRight?: React.Type<MarkerProps>;
 * customLabel?: React.Type<LabelProps>;
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
