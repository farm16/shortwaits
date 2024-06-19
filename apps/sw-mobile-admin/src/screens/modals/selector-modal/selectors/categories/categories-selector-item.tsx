import { CategoryDtoType } from "@shortwaits/shared-lib";
import { ButtonCard } from "@shortwaits/shared-ui";
import React from "react";
import { SelectorItemProps } from "../../selector-types";

export function CategoriesSelectorItem(props: SelectorItemProps<CategoryDtoType>) {
  const { item, onSelectItem, disabled = false, isSelected, language } = props;

  const title = language === "en" ? item.name : item.translations?.find(translation => translation?.languageCode === language)?.translation || item.name;
  const rightIconName = isSelected ? "checkbox-outline" : "checkbox-blank-outline";

  return (
    <ButtonCard
      rightIconName={rightIconName}
      disabled={disabled}
      title={title}
      onPress={() => {
        onSelectItem(item);
      }}
    />
  );
}
