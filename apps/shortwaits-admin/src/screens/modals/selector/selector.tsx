import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

import { ModalsScreenProps, SelectorModalModeType } from "../../../navigation";
import { SelectorConfigsKeys } from "./selector-config";
import { useTheme } from "../../../theme";
import { CategoriesSelector } from "./selectors/categories/categories-selector";
import { StaffSelector } from "./selectors/staff/staff-selector";
import { ServicesSelector } from "./selectors/services/services-selector";

export type SelectorComponentType = FC<
  ModalsScreenProps<"selector-modal-screen"> & { type: SelectorConfigsKeys }
>;
export const SelectorScreenModal: FC<
  ModalsScreenProps<"selector-modal-screen">
> = (props) => {
  const { route } = props;
  const { type } = route.params;

  const { Colors } = useTheme();

  const selectorsComponents: Record<
    SelectorModalModeType,
    SelectorComponentType
  > = {
    staff: StaffSelector,
    categories: CategoriesSelector,
    services: ServicesSelector,
  };
  const SelectorComponent = selectorsComponents[type];

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <SelectorComponent {...props} type={type} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
});
