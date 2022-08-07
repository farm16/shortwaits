const AUTH_ENDPOINTS = {
  postAuthAdminSignIn: {
    endpoint: '/auth/admin/sign-in',
    method: 'post',
    description: '',
  },
  getAuthAdminSignOut: {
    endpoint: '/auth/admin/sign-out',
    method: 'get',
    description: '',
  },
  postAuthAdminSignUp: {
    endpoint: '/auth/admin/sign-up',
    method: 'post',
    description: '',
  },
  putAuthAdminChangePassword: {
    endpoint: '/auth/admin/change-password',
    method: 'put',
    description: '',
  },
  postAuthAdminRefreshToken: {
    endpoint: '/auth/admin/refresh-token',
    method: 'post',
    description: '',
  },
} as const;

const BUSINESS_ENDPOINTS = {
  getAllBusiness: {
    endpoint: '/business/all/:limit?/:page',
    method: 'get',
    description: '',
  },
  getBusinessById: {
    endpoint: '/business/:id',
    method: 'get',
    description: '',
  },
  postBusiness: {
    endpoint: '/business',
    method: 'post',
    description: '',
  },
  putBusinessById: {
    endpoint: '/business/:id',
    method: 'put',
    description: '',
  },
  deleteBusinessById: {
    endpoint: '/business/:id',
    method: 'delete',
    description: '',
  },
  getBusinessCategoriesById: {
    endpoint: '/business/categories/:id',
    method: 'get',
    description: '',
  },
  getBusinessHoursById: {
    endpoint: '/business/hours/:id',
    method: 'get',
    description: '',
  },
  getBusinessStaffById: {
    endpoint: '/business/staff/:id',
    method: 'get',
    description: '',
  },
  getBusinessCurrencyById: {
    endpoint: '/business/currency/:id',
    method: 'get',
    description: '',
  },
  getBusinessServicesById: {
    endpoint: '/business/services/:id',
    method: 'get',
    description: '',
  },
} as const;

const SERVICES_ENDPOINTS = {
  getAllServices: {
    endpoint: '/services/all/:limit?/:page?',
    method: 'get',
    description: '',
  },
  getServicesById: {
    endpoint: '/services/:id',
    method: 'get',
    description: '',
  },
  postServices: {
    endpoint: '/services',
    method: 'post',
    description: '',
  },
  putServicesById: {
    endpoint: '/services/:id',
    method: 'put',
    description: '',
  },
  deleteServicesById: {
    endpoint: '/services/:id',
    method: 'delete',
    description: '',
  },
} as const;

const CATEGORIES_ENDPOINT = {
  getCategoriesById: {
    endpoint: '/categories/:id',
    method: 'get',
    description: '',
  },
  getAllCategories: {
    endpoint: '/categories/all',
    method: 'get',
    description: '',
  },
  postCategories: {
    endpoint: '/categories',
    method: 'post',
    description: '',
  },
  putCategoriesById: {
    endpoint: '/categories/:id',
    method: 'put',
    description: '',
  },
  deleteCategoriesById: {
    endpoint: '/categories/:id',
    method: 'delete',
    description: '',
  },
} as const;

const USERS_ENDPOINTS = {
  getAllUsers: {
    endpoint: '/users',
    method: 'get',
    description: '',
  },
  getUsersById: {
    endpoint: '/users/:id',
    method: 'get',
    description: '',
  },
  postUsers: {
    endpoint: '/users',
    method: 'post',
    description: '',
  },
  putUsersById: {
    endpoint: '/users',
    method: 'put',
    description: '',
  },
  deleteUsersById: {
    endpoint: '/users/:id',
    method: 'delete',
    description: '',
  },
} as const;

const DEFAULT_DATA_ENDPOINTS = {
  getMobileDefaultData: {
    endpoint: '/mobile-admin/default',
    method: 'get',
    description: '',
  },
} as const;

export const API_ENDPOINT_CONFIG = {
  ...AUTH_ENDPOINTS,
  ...BUSINESS_ENDPOINTS,
  ...SERVICES_ENDPOINTS,
  ...CATEGORIES_ENDPOINT,
  ...USERS_ENDPOINTS,
  ...DEFAULT_DATA_ENDPOINTS,
} as const;

export type ApiEndpointsType =
  typeof API_ENDPOINT_CONFIG[keyof typeof API_ENDPOINT_CONFIG]['endpoint'];

export type AuthEndpointsType =
  typeof AUTH_ENDPOINTS[keyof typeof AUTH_ENDPOINTS]['endpoint'];

export type BusinessEndpointsType =
  typeof BUSINESS_ENDPOINTS[keyof typeof BUSINESS_ENDPOINTS]['endpoint'];

export type ServicesEndpointsType =
  typeof SERVICES_ENDPOINTS[keyof typeof SERVICES_ENDPOINTS]['endpoint'];

export type CategoriesEndpointsType =
  typeof CATEGORIES_ENDPOINT[keyof typeof CATEGORIES_ENDPOINT]['endpoint'];

export type UsersEndpointsType =
  typeof USERS_ENDPOINTS[keyof typeof USERS_ENDPOINTS]['endpoint'];

export type DefaultDataEndpointsType =
  typeof DEFAULT_DATA_ENDPOINTS[keyof typeof DEFAULT_DATA_ENDPOINTS]['endpoint'];
