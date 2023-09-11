type HttpMethod = "POST" | "GET" | "PUT" | "DELETE";
type Endpoint = "auth/admin/local/sign-in" | "auth/admin/local/sign-out" | "auth/admin/local/sign-up" | "auth/admin/local/forgot-password" | "auth/admin/local/refresh" | "auth/admin/social/sign-up" | "auth/admin/social/sign-in" | `business/${string}` | `business/${string}/admins` | `business/${string}/services` | `business/${string}/categories` | `business/${string}/hours` | `business/${string}/events` | `business/${string}/clients` | `business/${string}/staff` | "business/register" | "shortwaits/admin/mobile" | `events/business/summary/${string}` | `events/business/${string}` | "events/people" | `events/${string}` | "events" | `events/delete/${string}` | "events/delete" | "services" | `services/${string}` | "business-user/multiple";
export declare const createEndpoint: <T = any>(endpoint: Endpoint, method: HttpMethod) => {
    getConfig: (pathVars: string[], queryParams: T) => {
        method: HttpMethod;
        url: string;
    };
};
export declare const endpoints: {
    signInLocal: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    signOutLocal: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    signUpLocal: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    signUpSocial: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    signInSocial: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    forgotPasswordLocal: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    refreshLocal: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getBusiness: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    updateBusiness: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getBusinessAdmins: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getBusinessServices: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getBusinessCategories: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getBusinessHours: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getBusinessEvents: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getBusinessClients: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getBusinessStaff: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    registerBusiness: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    createBusinessStaff: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    updateBusinessStaff: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    createBusinessClient: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    updateBusinessClient: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getBusinessUsers: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getShortwaitsAdminMobile: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getEventsBusinessSummary: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getEventsForBusiness: {
        getConfig: (pathVars: string[], queryParams: {
            page?: number | undefined;
            limit?: number | undefined;
            date?: string | undefined;
            filterBy?: string | undefined;
        }) => {
            method: HttpMethod;
            url: string;
        };
    };
    createEventForBusiness: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getEvents: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getEvent: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    updateEvents: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    deleteEvent: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    deleteEvents: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getPeopleInEvent: {
        getConfig: (pathVars: string[], queryParams: {
            eventId: string;
        }) => {
            method: HttpMethod;
            url: string;
        };
    };
    getServices: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
    getService: {
        getConfig: (pathVars: string[], queryParams: any) => {
            method: HttpMethod;
            url: string;
        };
    };
};
export {};
