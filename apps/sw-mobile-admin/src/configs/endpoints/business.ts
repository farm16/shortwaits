const BUSINESS_BASE_PATH = "/business";

type BusinessProps = {
  getPath(id?: string): string;
  METHOD: "POST" | "GET" | "PUT" | "DELETE";
};

export const BUSINESS = {
  getBusiness: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}`,
    METHOD: "GET",
  } as BusinessProps,
  updateBusiness: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}`,
    METHOD: "PUT",
  } as BusinessProps,
  getBusinessServices: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/services`,
    METHOD: "GET",
  } as BusinessProps,
  getBusinessCategories: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/categories`,
    METHOD: "GET",
  } as BusinessProps,
  getBusinessStaff: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/staff`,
    METHOD: "GET",
  } as BusinessProps,
  getBusinessHours: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/hours`,
    METHOD: "GET",
  } as BusinessProps,
  updateBusinessHours: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/hours`,
    METHOD: "PUT",
  } as BusinessProps,
  registerBusiness: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/registration/complete`,
    METHOD: "PUT",
  } as BusinessProps,
  createBusinessUser: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/staff`,
    METHOD: "POST",
  } as BusinessProps,
  createBusinessClient: {
    getPath: (_id: string) => `${BUSINESS_BASE_PATH}/${_id}/clients`,
    METHOD: "POST",
  } as BusinessProps,
};
