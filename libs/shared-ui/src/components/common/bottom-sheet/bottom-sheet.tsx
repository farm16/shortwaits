import GBottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { ForwardedRef, forwardRef, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../../../theme";
import { BottomSheetProps } from "./bottom-sheet-types";

export const defaultSnapPointsLevels = {
  1: ["35%"],
  6: ["45%"],
  7: ["60%"],
  8: ["85%"],
  2: ["35%", "60%"],
  3: ["35%", "60%", "85%"],
  5: ["85%", "60%"],
  4: ["85%", "60%", "35%"],
} as const;

export const BottomSheet = forwardRef((props: BottomSheetProps, ref: ForwardedRef<GBottomSheet | null>) => {
  const { unsafeBottom = false, onChange, snapPointsLevel = 1, snapPoints: snapPointsOverride, children, ...rest } = props;

  const { Colors } = useTheme();
  const sheetStyle = useMemo(
    () => ({
      ...styles.sheetContainer,
      shadowColor: Colors.text,
    }),
    [Colors.text]
  );

  const renderBackdrop = useCallback(
    (bottomSheetBackdropProps: BottomSheetBackdropProps) => <BottomSheetBackdrop {...bottomSheetBackdropProps} opacity={0.5} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <Portal hostName="BottomSheet">
      <GBottomSheet
        backdropComponent={renderBackdrop}
        style={sheetStyle}
        enablePanDownToClose
        index={-1}
        onChange={onChange}
        snapPoints={defaultSnapPointsLevels[snapPointsLevel]}
        ref={ref}
        keyboardBlurBehavior="restore"
        {...rest}
      >
        {children}
      </GBottomSheet>
    </Portal>
  );
});

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: "white",
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.75,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
