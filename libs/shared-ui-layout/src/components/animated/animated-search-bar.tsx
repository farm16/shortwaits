import React, { useState, useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { SearchBar } from "../search-bar/search-bar";
import { Platform } from "react-native";

type AnimatedSearchBarProps = {
  onChangeText: (text: string) => void;
  isVisible?: boolean;
};

export const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({ onChangeText, isVisible = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isTextInputVisible, setIsTextInputVisible] = useState(isVisible);

  const opacityValue = useSharedValue(isTextInputVisible ? 1 : 0);
  const translateYValue = useSharedValue(isTextInputVisible ? 0 : 10);

  const textInputStyle = useAnimatedStyle(() => ({
    opacity: opacityValue.value,
    transform: [
      {
        translateY: translateYValue.value,
      },
    ],
  }));

  useEffect(() => {
    setIsTextInputVisible(isVisible);
    opacityValue.value = withTiming(isVisible ? 1 : 0);
    translateYValue.value = withTiming(isVisible ? 0 : 10);
  }, [isVisible, opacityValue, translateYValue]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onChangeText(text);
  };

  return (
    <Animated.View style={textInputStyle}>
      {isVisible ? <SearchBar isAnimated onChangeText={handleSearch} value={searchQuery} /> : null}
    </Animated.View>
  );
};
