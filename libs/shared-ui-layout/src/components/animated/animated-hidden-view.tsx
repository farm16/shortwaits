import React, { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type AnimatedHiddenViewProps = {
  isVisible?: boolean;
  children: React.ReactNode;
};

export const AnimatedHiddenView: React.FC<AnimatedHiddenViewProps> = ({
  isVisible = false,
  children,
}) => {
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

  return (
    <Animated.View style={textInputStyle}>
      {isVisible ? children : null}
    </Animated.View>
  );
};
