import { isEmpty } from "lodash";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentServicesState } from "..";

export const useService = (serviceId?: string) => {
  const services = useSelector(selectCurrentServicesState);
  // console.log("useService hook | serviceId >>>", serviceId);
  // console.log("useService hook | service >>>", services);
  const service =
    isEmpty(services) || !serviceId
      ? null
      : services.find(service => service._id === serviceId);

  return useMemo(() => service, [service]);
};

export const useServices = () => {
  const services = useSelector(selectCurrentServicesState);
  // console.log("services hook | services >>>", services);

  return useMemo(() => services, [services]);
};
