import { BusinessLabelType, CategoryDtoType } from "@shortwaits/shared-lib";
import { GenericModalData } from "../../../navigation";

export const convertBusinessLabelsToGenericModalData = (businessLabels: BusinessLabelType[]): GenericModalData<BusinessLabelType>[] => {
  return businessLabels.map(label => ({
    _id: label.name,
    title: label.emojiShortName,
    subtitle: label.description,
    itemData: label,
  }));
};

export const convertGenericModalDataToBusinessLabels = (genericModalData: GenericModalData<BusinessLabelType>[]): BusinessLabelType[] => {
  return genericModalData.map(data => ({
    name: data.itemData?.name,
    description: data.itemData?.description,
    isFavorite: data.itemData?.isFavorite,
    emojiShortName: data.itemData?.emojiShortName,
  }));
};

export const convertCategoryToGenericModalData = (categories: CategoryDtoType[]): GenericModalData<CategoryDtoType>[] => {
  return categories.map(category => ({
    _id: category._id,
    title: category.name,
    subtitle: category.description,
    itemData: category,
  }));
};
