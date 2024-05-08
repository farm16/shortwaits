import { EventsDtoType } from "@shortwaits/shared-lib";
import { GenericModalData } from "../navigation/navigation-types";

export function convertStaticSelectorModalData(data: EventsDtoType, type: "events") {
  if (type === "events") {
    const convertedData = (data as EventsDtoType).map(item => {
      return {
        _id: item._id,
        title: item.name,
        subTitle: item.description,
        itemData: item,
      } as GenericModalData;
    });
    return convertedData;
  }
  return null;
}
