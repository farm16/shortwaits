import React, { useRef, useState } from "react";
import { FlatList, FlatListProps, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const defaultFadeColors = ["rgba(229, 229, 229, 0.18)", "rgba(206, 201, 201, 0.6)", "rgba(206, 201, 201, 0.9)"];

type FadedScrollViewProps = {
  allowStartFade?: boolean;
  allowEndFade?: boolean;
  fadeSize?: number;
  isHorizontal?: boolean;
  fadeColors?: string[];
  isCloseToEnd?: (isClose: boolean) => void;
  isCloseToStart?: (isClose: boolean) => void;
  scrollThreshold?: number;
  allowDivider?: boolean;
  isRtl?: boolean;
  onContentSizeChange?: (width: number, height: number) => void;
  endFadeStyle?: StyleProp<ViewStyle>;
  startFadeStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  dividerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
} & FlatListProps<any>;

export const FadedScrollView = React.forwardRef<FlatList, FadedScrollViewProps>((props, ref) => {
  const {
    allowStartFade: _allowStartFade = true,
    allowEndFade: _allowEndFade = true,
    allowDivider = false,
    fadeSize = 20,
    fadeColors = defaultFadeColors,
    scrollThreshold = 10,
    isRtl = false,
    scrollEventThrottle = 16,
    isHorizontal,
    isCloseToEnd,
    containerStyle,
    isCloseToStart,
    onScroll,
    startFadeStyle,
    endFadeStyle,
    dividerStyle,
    style,
  } = props;

  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [availableHeight, setAvailableHeight] = useState(0);
  const [allowStartFade, setAllowStartFade] = useState(_allowStartFade);
  const [allowEndFade, setAllowEndFade] = useState(_allowEndFade);

  const flatListRef = useRef<FlatList>(null);

  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    setScrollHeight(contentHeight);
    setScrollWidth(contentWidth);

    if (onContentSizeChange) {
      onContentSizeChange(contentWidth, contentHeight);
    }
  };

  const _onLayout = (event: LayoutChangeEvent) => {
    const containerWidth = event.nativeEvent.layout.width;
    const containerHeight = event.nativeEvent.layout.height;

    setAvailableWidth(containerWidth);
    setAvailableHeight(containerHeight);
  };

  const isEndFadeAllowed = (): boolean => {
    const sizeToCompare = isHorizontal ? scrollWidth : scrollHeight;
    const availableSpace = isHorizontal ? availableWidth : availableHeight;
    return allowEndFade ? sizeToCompare > availableSpace : false;
  };

  const ifCloseToStart = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
    return isHorizontal ? contentOffset.x < scrollThreshold : contentOffset.y < scrollThreshold;
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
    return isHorizontal
      ? layoutMeasurement.width + contentOffset.x >= contentSize.width - scrollThreshold
      : layoutMeasurement.height + contentOffset.y >= contentSize.height - scrollThreshold;
  };

  const allowReverse = (): boolean => {
    return Platform.OS === "android" && isRtl;
  };

  const onScrolled = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToEnd) {
      isCloseToEnd(isCloseToBottom(e.nativeEvent));
    }
    if (isCloseToStart) {
      isCloseToStart(ifCloseToStart(e.nativeEvent));
    }
    if (allowStartFade) {
      if (!allowReverse()) {
        setAllowStartFade(ifCloseToStart(e.nativeEvent) ? false : true);
      } else {
        setAllowEndFade(ifCloseToStart(e.nativeEvent) ? false : true);
      }
    }
    if (allowEndFade) {
      if (!allowReverse()) {
        setAllowEndFade(isCloseToBottom(e.nativeEvent) ? false : true);
      } else {
        setAllowStartFade(isCloseToBottom(e.nativeEvent) ? false : true);
      }
    }
    if (onScroll) {
      onScroll(e);
    }
  };

  const getStartFade = () => {
    return isHorizontal ? (
      <LinearGradient
        start={{ x: isRtl ? 0 : 1, y: 0 }}
        end={{ x: isRtl ? 1 : 0, y: 0 }}
        style={[{ position: "absolute", start: 0, width: fadeSize, height: "100%" }, startFadeStyle]}
        colors={fadeColors}
        pointerEvents={"none"}
      />
    ) : (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={[{ position: "absolute", top: 0, width: "100%", height: fadeSize }, startFadeStyle]}
        colors={fadeColors}
        pointerEvents={"none"}
      />
    );
  };

  const getEndFade = () => {
    return isHorizontal ? (
      <LinearGradient
        start={{ x: isRtl ? 1 : 0, y: 0 }}
        end={{ x: isRtl ? 0 : 1, y: 0 }}
        style={[{ position: "absolute", end: 0, width: fadeSize, height: "100%" }, endFadeStyle]}
        colors={fadeColors}
        pointerEvents={"none"}
      />
    ) : (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[{ position: "absolute", bottom: 0, width: "100%", height: fadeSize }, endFadeStyle]}
        colors={fadeColors}
        pointerEvents={"none"}
      />
    );
  };

  const getDivider = () => {
    return isHorizontal ? (
      <View style={[{ width: 1, height: "100%", backgroundColor: "#E6E6E6" }, dividerStyle]} />
    ) : (
      <View style={[{ width: "100%", height: 1, backgroundColor: "#E6E6E6" }, dividerStyle]} />
    );
  };

  return (
    <View style={[styles.container, containerStyle, { flexDirection: isHorizontal ? "row" : "column" }]} onLayout={_onLayout}>
      {getDivider()}
      <FlatList
        {...props}
        ref={ref || flatListRef}
        style={[styles.flatListStyle, style]}
        onContentSizeChange={onContentSizeChange}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={onScrolled}
      />
      {getDivider()}
      {getStartFade()}
      {getEndFade()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  flatListStyle: {
    paddingTop: 16,
    flex: 1,
  },
});
