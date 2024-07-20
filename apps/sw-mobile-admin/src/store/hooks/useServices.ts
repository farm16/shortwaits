import { ServiceDtoType } from "@shortwaits/shared-lib";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentServicesState } from "..";

export const useService = (serviceId?: string): ServiceDtoType | null => {
  const services = useSelector(selectCurrentServicesState);

  return useMemo(() => {
    if (isEmpty(services) || !serviceId) {
      return null;
    }
    const service = services.find(service => service._id === serviceId);
    if (!service) {
      return null;
    }

    return service;
  }, [services]);
};

export const useServices = () => {
  const services = useSelector(selectCurrentServicesState);
  // console.log("services hook | services >>>", services);

  return useMemo(() => services, [services]);
};
