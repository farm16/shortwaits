import {EventsDtoType} from '@shortwaits/shared-lib';

// func to convert the static selector modal data to the format required by the static selector modal
export function convertStaticSelectorModalData(
  data: EventsDtoType,
  type: 'events',
): {key: string; title: string; subTitle?: string; itemData?: any}[] {
  if (type === 'events') {
    const convertedData = (data as EventsDtoType).map(item => {
      return {
        key: item._id,
        title: item.name,
        subTitle: item.description,
        itemData: item,
      };
    });
    return convertedData;
  }
}
