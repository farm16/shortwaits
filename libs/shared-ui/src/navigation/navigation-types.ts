export type GenericModalData<T = any> = {
  _id: string; // selected data will look for this id
  title: string;
  subTitle?: string;
  itemData?: T;
};
