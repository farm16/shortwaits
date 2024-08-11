import { ClientsDtoType, LocalClientsDtoType } from "@shortwaits/shared-lib";

export type Route = {
  key: string;
  title: string;
};
export type Clients = {
  clients?: ClientsDtoType;
  localClients?: LocalClientsDtoType;
};

export type SelectedClients = {
  clients: string[];
  localClients: string[];
};
