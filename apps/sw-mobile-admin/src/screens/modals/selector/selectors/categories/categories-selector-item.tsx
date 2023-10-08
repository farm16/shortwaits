import React from "react";
import { CategoryDtoType } from "@shortwaits/shared-lib";

import { ButtonCard } from "../../../../../components";
import { SelectorItemProps } from "../../selector-types";

export function CategoriesSelectorItem(props: SelectorItemProps<CategoryDtoType>) {
  const { item, onSelectItem, disabled = false, multiple = false, isSelected, language } = props;

  const title =
    language === "en"
      ? item.name
      : item.translations?.find(translation => translation?.languageCode === language)?.translation || item.name;

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
