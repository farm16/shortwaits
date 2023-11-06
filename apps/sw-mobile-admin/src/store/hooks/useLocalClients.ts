import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentLocalClientsState } from "../slices";

export const useLocalClients = () => {
  const localClients = useSelector(selectCurrentLocalClientsState);

  return useMemo(() => localClients, [localClients]);
};

export const useLocalClient = clientId => {
  const localClients = useSelector(selectCurrentLocalClientsState);
  const localClient = localClients.find(localClient => localClient._id === clientId);

  return useMemo(() => localClient, [localClient]);
};
