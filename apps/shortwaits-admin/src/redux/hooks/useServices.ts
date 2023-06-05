import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentServicesState } from "../../redux";

export const useService = (serviceId?: string) => {
  const services = useSelector(selectCurrentServicesState);
  console.log("useService", serviceId);
  const service = services
    ? services.find(service => service._id === serviceId)
    : null;
  return useMemo(() => service, [service]);
};

export const useServices = () => {
  const services = useSelector(selectCurrentServicesState);

  return useMemo(() => services, [services]);
};
