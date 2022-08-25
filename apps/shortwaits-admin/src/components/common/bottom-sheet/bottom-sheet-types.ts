import { RefObject } from "react";
import BottomSheet, {
  BottomSheetProps as BottomSheetComponentProps,
} from "@gorhom/bottom-sheet";
import { defaultSnapPointsLevels } from "./bottom-sheet";

export type snapLevelsType = 0 | 1 | 2 | 3;
export type BottomSheetRefType = RefObject<BottomSheet>;
export { BottomSheet as BottomSheetType };

export type BottomSheetProps = Partial<BottomSheetComponentProps> & {
  snapPointsLevel?: keyof typeof defaultSnapPointsLevels;
};
