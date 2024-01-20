import { RefObject } from "react";
import BottomSheet, { BottomSheetProps as BottomSheetComponentProps } from "@gorhom/bottom-sheet";
import { defaultSnapPointsLevels } from "./bottom-sheet";

export type snapLevelsType = keyof typeof defaultSnapPointsLevels;
export type BottomSheetRefType = RefObject<BottomSheet>;
export { BottomSheet as BottomSheetType };

export type BottomSheetProps = Partial<BottomSheetComponentProps> & {
  snapPointsLevel?: snapLevelsType;
  unsafeBottom?: boolean;
};
