import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

import { ModalsScreenProps, SelectorModalType } from "../../../navigation";
import { SelectorConfigsKeys } from "./selector-config";
import { useTheme } from "../../../theme";
import { OnboardingCategoriesSelector } from "./selectors/categories/categories-selector";

export type SelectorComponentType = FC<
  ModalsScreenProps<"selector-modal-screen"> & { type: SelectorConfigsKeys }
>;
export const SelectorScreenModal: FC<
  ModalsScreenProps<"selector-modal-screen">
> = (props) => {
  const { route } = props;
  const { type } = route.params;

  const { Colors } = useTheme();

  const selectorsComponents: Record<SelectorModalType, SelectorComponentType> =
    {
      "onboarding-categories": OnboardingCategoriesSelector,
      staff: OnboardingCategoriesSelector,
      categories: OnboardingCategoriesSelector,
      "onboarding-staff": OnboardingCategoriesSelector,
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
