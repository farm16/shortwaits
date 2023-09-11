"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoints = exports.createEndpoint = void 0;
const createEndpoint = (endpoint, method) => {
    return {
        getConfig: (pathVars, queryParams) => {
            const url = endpoint
                .split("/")
                .map(part => (part.startsWith(":") ? pathVars.shift() : part))
                .join("/");
            const queryString = queryParams ? new URLSearchParams(queryParams !== null && queryParams !== void 0 ? queryParams : {}).toString() : undefined;
            const urlWithQuery = queryString ? `${url}?${queryString}` : url;
            if (process.env["NODE_ENV"] !== "production") {
                console.log(`${method} - ${urlWithQuery}`);
            }
            return {
                method,
                url: urlWithQuery,
            };
        },
    };
};
exports.createEndpoint = createEndpoint;
exports.endpoints = {
    // auth
    signInLocal: (0, exports.createEndpoint)("auth/admin/local/sign-in", "POST"),
    signOutLocal: (0, exports.createEndpoint)("auth/admin/local/sign-out", "POST"),
    signUpLocal: (0, exports.createEndpoint)("auth/admin/local/sign-up", "POST"),
    signUpSocial: (0, exports.createEndpoint)("auth/admin/social/sign-up", "POST"),
    signInSocial: (0, exports.createEndpoint)("auth/admin/social/sign-in", "POST"),
    forgotPasswordLocal: (0, exports.createEndpoint)("auth/admin/local/forgot-password", "POST"),
    refreshLocal: (0, exports.createEndpoint)("auth/admin/local/refresh", "PUT"),
    // business
    getBusiness: (0, exports.createEndpoint)(`business/:businessId`, "GET"),
    updateBusiness: (0, exports.createEndpoint)(`business/:businessId`, "PUT"),
    getBusinessAdmins: (0, exports.createEndpoint)(`business/:businessId/admins`, "GET"),
    getBusinessServices: (0, exports.createEndpoint)(`business/:businessId/services`, "GET"),
    getBusinessCategories: (0, exports.createEndpoint)(`business/:businessId/categories`, "GET"),
    getBusinessHours: (0, exports.createEndpoint)(`business/:businessId/hours`, "GET"),
    getBusinessEvents: (0, exports.createEndpoint)(`business/:businessId/events`, "GET"),
    getBusinessClients: (0, exports.createEndpoint)(`business/:businessId/clients`, "GET"),
    getBusinessStaff: (0, exports.createEndpoint)(`business/:businessId/staff`, "GET"),
    registerBusiness: (0, exports.createEndpoint)("business/register", "POST"),
    //business User === Staff
    //client User === Client
    createBusinessStaff: (0, exports.createEndpoint)(`business/:businessId/staff`, "POST"),
    updateBusinessStaff: (0, exports.createEndpoint)(`business/:businessId/staff`, "PUT"),
    createBusinessClient: (0, exports.createEndpoint)(`business/:businessId/clients`, "POST"),
    updateBusinessClient: (0, exports.createEndpoint)(`business/:businessId/clients`, "PUT"),
    // Users this includes both staff and client users
    getBusinessUsers: (0, exports.createEndpoint)("business-user/multiple", "POST"),
    // shortwaits
    getShortwaitsAdminMobile: (0, exports.createEndpoint)("shortwaits/admin/mobile", "GET"),
    //events
    getEventsBusinessSummary: (0, exports.createEndpoint)(`events/business/summary/:businessId`, "GET"),
    getEventsForBusiness: (0, exports.createEndpoint)(`events/business/:businessId`, "GET"),
    createEventForBusiness: (0, exports.createEndpoint)(`events/business/:businessId`, "POST"),
    getEvents: (0, exports.createEndpoint)("events", "GET"),
    getEvent: (0, exports.createEndpoint)(`events/:eventId`, "GET"),
    updateEvents: (0, exports.createEndpoint)(`events/business/:businessId`, "PUT"),
    deleteEvent: (0, exports.createEndpoint)(`events/delete/:eventId`, "PUT"),
    deleteEvents: (0, exports.createEndpoint)("events/delete", "PUT"),
    getPeopleInEvent: (0, exports.createEndpoint)(`events/people`, "GET"),
    //services
    getServices: (0, exports.createEndpoint)("services", "GET"),
    getService: (0, exports.createEndpoint)(`services/:serviceId`, "GET"),
};
//# sourceMappingURL=endpoints.js.map