import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import {
  BottomSheetModal as G_BottomSheetModal,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import { useTheme } from "../../../theme";
import { BottomSheetProps } from "./bottom-sheet-types";

const defaultSnapPoints = ["35%", "60%", "90%"];

export const BottomSheetModal = forwardRef(
  (props: BottomSheetProps, ref: ForwardedRef<G_BottomSheetModal | null>) => {
    const {
      onChange,
      snapPoints: snapPointsOverride,
      snapLevels = 3,
      children,
      ...rest
    } = props;

    const snapPoints = useMemo(() => defaultSnapPoints, []);

    const { Colors } = useTheme();
    const sheetStyle = useMemo(
      () => ({
        ...styles.sheetContainer,
        shadowColor: Colors.text,
      }),
      [Colors.text]
    );

    const renderBackdrop = useCallback(
      (props) => <BottomSheetBackdrop {...props} />,
      []
    );
    return (
      <G_BottomSheetModal
        backdropComponent={renderBackdrop}
        style={sheetStyle}
        onChange={onChange}
        backgroundStyle={{ backgroundColor: Colors.background }}
        snapPoints={snapPoints}
        ref={ref}
        {...rest}
      >
        <View style={styles.contentContainer}>{children || null}</View>
      </G_BottomSheetModal>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
