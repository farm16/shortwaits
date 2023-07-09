export const SERVICES = {
  postServices: {
    getPath: (serviceId: string) => `/services?serviceId=${serviceId}`,
    METHOD: "POST",
  },
  getService: {
    getPath: (serviceId: string) => `/services?serviceId=${serviceId}`,
    METHOD: "GET",
  },
  getServices: {
    getPath: () => "/services",
    METHOD: "GET",
  },
  getBusinessServices: {
    getPath: (businessId: string) => `/services?businessId=${businessId}`,
    METHOD: "GET",
  },
};
