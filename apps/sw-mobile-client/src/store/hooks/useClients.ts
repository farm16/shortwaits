import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentClientsState } from "../slices/clients";

export const useClients = () => {
  const clients = useSelector(selectCurrentClientsState);

  return useMemo(() => clients, [clients]);
};

export const useClient = clientId => {
  const clients = useSelector(selectCurrentClientsState);
  const client = clients.find(client => client._id === clientId);

  return useMemo(() => client, [client]);
};
