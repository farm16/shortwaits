import React, { ForwardedRef, forwardRef, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import GBottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";

import { useTheme } from "../../../theme";
import { BottomSheetProps } from "./bottom-sheet-types";

const defaultSnapPointsLevels = {
  1: ["35%"],
  2: ["35%", "60%"],
  3: ["35%", "60%", "85%"],
};

export const BottomSheet = forwardRef(
  (props: BottomSheetProps, ref: ForwardedRef<GBottomSheet | null>) => {
    const {
      onChange,
      snapPointsLevel = 1,
      snapPoints: snapPointsOverride,
      children,
      ...rest
    } = props;

    const { Colors } = useTheme();
    const sheetStyle = useMemo(
      () => ({
        ...styles.sheetContainer,
        shadowColor: Colors.text,
      }),
      [Colors.text]
    );

    const renderBackdrop = useCallback(
      (bottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...bottomSheetBackdropProps}
          opacity={0.5}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    return (
      <Portal>
        <GBottomSheet
          backdropComponent={renderBackdrop}
          style={sheetStyle}
          enablePanDownToClose
          index={-1}
          onChange={onChange}
          backgroundStyle={{ backgroundColor: Colors.background }}
          snapPoints={defaultSnapPointsLevels[snapPointsLevel]}
          ref={ref}
          keyboardBlurBehavior="restore"
          {...rest}
        >
          {children}
        </GBottomSheet>
      </Portal>
    );
  }
);

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
