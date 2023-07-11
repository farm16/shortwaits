type HttpMethod = "POST" | "GET" | "PUT" | "DELETE";
type Endpoints =
  | "auth/admin/local/sign-in"
  | "auth/admin/local/sign-out"
  | "auth/admin/local/sign-up"
  | "auth/admin/local/forgot-password"
  | "auth/admin/local/refresh"
  | "business/:businessId"
  | "business/:businessId/admins"
  | "business/:businessId/services"
  | "business/:businessId/categories"
  | "business/:businessId/hours"
  | "business/:businessId/events"
  | "business/:businessId/clients"
  | "business/:businessId/staff"
  | "business/register"
  | "shortwaits/admin/mobile"
  | "events/:eventId"
  | "events/summary/business/:businessId"
  | "events/business/:businessId"
  | "events"
  | "services"
  | "services/:serviceId";

type EndpointProps = {
  methods: {
    [key in HttpMethod]?: {
      params?: string[];
    };
  };
};
type EndpointConfig = {
  [key in Endpoints]: EndpointProps;
};

export const allEndpoints: EndpointConfig = {
  "auth/admin/local/sign-in": {
    methods: {
      POST: {},
    },
  },
  "auth/admin/local/sign-out": {
    methods: {
      POST: {},
    },
  },
  "auth/admin/local/sign-up": {
    methods: {
      POST: {},
    },
  },
  "auth/admin/local/forgot-password": {
    methods: {
      POST: {},
    },
  },
  "auth/admin/local/refresh": {
    methods: {
      PUT: {},
    },
  },
  "business/:businessId": {
    methods: {
      GET: {
        params: ["businessId"],
      },
      PUT: {
        params: ["businessId"],
      },
    },
  },
  "business/:businessId/admins": {
    methods: {
      GET: {
        params: ["businessId"],
      },
      POST: {
        params: ["businessId"],
      },
    },
  },
  "business/:businessId/services": {
    methods: {
      GET: {
        params: ["businessId"],
      },
      POST: {
        params: ["businessId"],
      },
    },
  },
  "business/:businessId/categories": {
    methods: {
      GET: {
        params: ["businessId"],
      },
      POST: {
        params: ["businessId"],
      },
    },
  },
  "business/:businessId/hours": {
    methods: {
      GET: {
        params: ["businessId"],
      },
      POST: {
        params: ["businessId"],
      },
    },
  },
  "business/:businessId/events": {
    methods: {
      GET: {
        params: ["businessId"],
      },
      POST: {
        params: ["businessId"],
      },
    },
  },
  "business/:businessId/clients": {
    methods: {
      GET: {
        params: ["businessId"],
      },
      POST: {
        params: ["businessId"],
      },
    },
  },
  "business/:businessId/staff": {
    methods: {
      GET: {
        params: ["businessId"],
      },
      POST: {
        params: ["businessId"],
      },
    },
  },
  "business/register": {
    methods: {
      PUT: {},
    },
  },
  "shortwaits/admin/mobile": {
    methods: {
      GET: {},
    },
  },
  "events/:eventId": {
    methods: {
      GET: {
        params: ["eventId"],
      },
    },
  },
  "events/summary/business/:businessId": {
    methods: {
      GET: {
        params: ["businessId"],
      },
    },
  },
  "events/business/:businessId": {
    methods: {
      GET: {
        params: ["businessId"],
      },
    },
  },
  events: {
    methods: {
      GET: {},
      POST: {},
    },
  },
  services: {
    methods: {
      GET: {},
      POST: {},
    },
  },
  "services/:serviceId": {
    methods: {
      GET: {
        params: ["serviceId"],
      },
      POST: {
        params: ["serviceId"],
      },
      DELETE: {
        params: ["serviceId"],
      },
    },
  },
};

export function getEndpointWithParams(
  endpoint: Endpoints,
  method: HttpMethod,
  params: Record<string, string>,
  isDebug?: boolean
): { url: string; method: HttpMethod } {
  const endpointObj = allEndpoints[endpoint];
  if (!endpointObj) {
    throw new Error(`Endpoint "${endpoint}" not found.`);
  }

  const endpointMethod = endpointObj.methods[method];
  if (!endpointMethod) {
    throw new Error(
      `Method "${method}" not allowed for endpoint "${endpoint}".`
    );
  }

  const endpointParams = endpointMethod.params;
  if (endpointParams) {
    const missingParams = endpointParams.filter(
      param => !Object.prototype.hasOwnProperty.call(params, param)
    );
    if (missingParams.length > 0) {
      throw new Error(
        `Missing required parameters for endpoint "${endpoint}": ${missingParams.join(
          ", "
        )}.`
      );
    }

    const endpointParamsObj = endpointParams.reduce((acc, param) => {
      acc[param] = params[param];
      return acc;
    }, {} as Record<string, string>);

    if (isDebug) {
      console.log("returning URL >>>", endpoint);
      console.log("returning METHOD >>>", method);
    }

    return {
      url: endpoint.replace(/:(\w+)/g, (_, param) => endpointParamsObj[param]),
      method,
    };
  }
  if (isDebug) {
    console.log("returning URL >>>", endpoint);
    console.log("returning METHOD >>>", method);
  }
  return { url: endpoint, method };
}
