import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";

export const useDefaultHeaderHeight = () => {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);
  return headerHeight;
};
