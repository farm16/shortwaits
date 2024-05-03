import { BusinessLabelType } from "@shortwaits/shared-lib";
import { GenericModalData } from "../../../navigation";

export const convertBusinessLabelsToGenericModalData = (businessLabels: BusinessLabelType[]): GenericModalData<BusinessLabelType>[] => {
  return businessLabels.map(label => ({
    key: label.name,
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
