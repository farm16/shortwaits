import { ButtonCard } from "@shortwaits/shared-ui";
import { CategoryDtoType } from "@shortwaits/shared-utils";
import React from "react";
import { SelectorItemProps } from "../../selector-types";

export function CategoriesSelectorItem(props: SelectorItemProps<CategoryDtoType>) {
  const { item, onSelectItem, disabled = false, multiple = false, isSelected, language } = props;

  const title = language === "en" ? item.name : item.translations?.find(translation => translation?.languageCode === language)?.translation || item.name;

  const getCheckIcon = () => (isSelected ? "checkbox-outline" : "checkbox-blank-outline");

  return (
    <ButtonCard
      rightIconName={multiple ? getCheckIcon() : "none"}
      disabled={disabled}
      title={title}
      onPress={() => {
        onSelectItem(item);
      }}
    />
  );
}
