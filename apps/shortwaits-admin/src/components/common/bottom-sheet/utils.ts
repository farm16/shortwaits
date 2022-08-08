import { useCallback } from "react"
import { snapLevelsType, BottomSheetRefType } from "./bottom-sheet-types"

export type UseBottomSheetType = ReturnType<typeof useBottomSheet>
export function useBottomSheet(bottomSheetRef: BottomSheetRefType) {
  const snapToIndex = useCallback(
    (index: snapLevelsType) => {
      bottomSheetRef.current?.snapToIndex(index)
    },
    [bottomSheetRef]
  )

  const expand = useCallback(() => {
    bottomSheetRef.current?.expand()
  }, [bottomSheetRef])

  const collapse = useCallback(() => {
    bottomSheetRef.current?.collapse()
  }, [bottomSheetRef])

  const close = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [bottomSheetRef])

  return { snapToIndex, expand, collapse, close }
}
