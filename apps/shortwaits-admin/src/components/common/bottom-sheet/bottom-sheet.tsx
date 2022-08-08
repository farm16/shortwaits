import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useMemo,
  useState
} from "react"
import { KeyboardAvoidingView, StyleSheet, View } from "react-native"
import G_BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet"
import { Portal } from "@gorhom/portal"

import { useTheme } from "@/theme"
import { BottomSheetProps } from "./bottom-sheet-types"

const defaultSnapPoints = ["35%", "60%", "85%"]

export const BottomSheet = forwardRef(
  (props: BottomSheetProps, ref: ForwardedRef<G_BottomSheet | null>) => {
    const {
      onChange,
      snapPoints: snapPointsOverride,
      children,
      ...rest
    } = props
    const [keyboardBehavior, setKeyboardBehavior] = useState<
      "extend" | "fillParent" | "interactive"
    >("interactive")
    const [keyboardBlurBehavior, setKeyboardBlurBehavior] = useState<
      "none" | "restore"
    >("none")

    const snapPoints = useMemo(
      () => snapPointsOverride ?? defaultSnapPoints,
      [snapPointsOverride]
    )

    const { Colors } = useTheme()
    const sheetStyle = useMemo(
      () => ({
        ...styles.sheetContainer,
        shadowColor: Colors.text
      }),
      [Colors.text]
    )

    const handleToggleKeyboardBehavior = useCallback(() => {
      setKeyboardBehavior(state => {
        switch (state) {
          case "interactive":
            return "extend"
          case "extend":
            return "fillParent"
          case "fillParent":
            return "interactive"
        }
      })
    }, [])

    const handleToggleKeyboardBlurBehavior = useCallback(() => {
      setKeyboardBlurBehavior(state => {
        switch (state) {
          case "none":
            return "restore"
          case "restore":
            return "none"
        }
      })
    }, [])

    const renderBackdrop = useCallback(
      bottomSheetBackdropProps => (
        <BottomSheetBackdrop
          {...bottomSheetBackdropProps}
          opacity={0.5}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    )
    return (
      <Portal>
        <G_BottomSheet
          backdropComponent={renderBackdrop}
          style={sheetStyle}
          enablePanDownToClose
          index={-1}
          onChange={onChange}
          backgroundStyle={{ backgroundColor: Colors.background }}
          snapPoints={snapPoints}
          ref={ref}
          keyboardBlurBehavior="restore"
          {...rest}
        >
          <KeyboardAvoidingView
            behavior="position"
            style={styles.contentContainer}
          >
            {children || null}
          </KeyboardAvoidingView>
        </G_BottomSheet>
      </Portal>
    )
  }
)

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: "white",
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.75,
    shadowRadius: 16.0,
    elevation: 24
  },
  contentContainer: {
    flex: 1,
    alignItems: "center"
  }
})
