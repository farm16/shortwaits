/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/config");

/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("swagger-themes");

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/swagger");

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = require("helmet");

/***/ }),
/* 7 */
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(3);
const common_1 = __webpack_require__(9);
const mongoose_1 = __webpack_require__(10);
const app_controller_1 = __webpack_require__(11);
const app_service_1 = __webpack_require__(12);
const api_module_1 = __webpack_require__(13);
const env_helper_1 = __webpack_require__(112);
const mongoose_service_1 = __webpack_require__(114);
const core_1 = __webpack_require__(2);
const guards_1 = __webpack_require__(64);
const transform_interceptor_1 = __webpack_require__(115);
const envFilePath = (0, env_helper_1.getEnvPath)();
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath,
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongoose_service_1.MongooseConfigService,
            }),
            api_module_1.ApiModule,
        ],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AtGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);


/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),
/* 10 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/mongoose");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const app_service_1 = __webpack_require__(12);
let AppController = exports.AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
let AppService = exports.AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const auth_module_1 = __webpack_require__(14);
const business_module_1 = __webpack_require__(72);
const categories_module_1 = __webpack_require__(78);
const shortwaits_module_1 = __webpack_require__(82);
const business_users_module_1 = __webpack_require__(87);
const events_module_1 = __webpack_require__(93);
const services_module_1 = __webpack_require__(100);
const client_user_module_1 = __webpack_require__(106);
let ApiModule = exports.ApiModule = class ApiModule {
};
exports.ApiModule = ApiModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            business_module_1.BusinessModule,
            shortwaits_module_1.ShortwaitsModule,
            events_module_1.EventsModule,
            services_module_1.ServicesModule,
            categories_module_1.CategoriesModule,
            client_user_module_1.ClientUserModule,
            business_users_module_1.BusinessUsersModule,
        ],
    })
], ApiModule);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(15);
const mongoose_1 = __webpack_require__(10);
const business_user_entity_1 = __webpack_require__(16);
const business_entity_1 = __webpack_require__(44);
const service_entity_1 = __webpack_require__(45);
const auth_controller_1 = __webpack_require__(46);
const auth_service_1 = __webpack_require__(47);
const at_strategy_1 = __webpack_require__(69);
const rt_strategy_1 = __webpack_require__(71);
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({}),
            mongoose_1.MongooseModule.forFeature([
                { name: business_user_entity_1.BusinessUser.name, schema: business_user_entity_1.BusinessUserSchema },
                { name: service_entity_1.Service.name, schema: service_entity_1.ServiceSchema },
                { name: business_entity_1.Business.name, schema: business_entity_1.BusinessSchema },
            ]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, at_strategy_1.AtStrategy, rt_strategy_1.RtStrategy],
    })
], AuthModule);


/***/ }),
/* 15 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/jwt");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessUserSchema = exports.BusinessUser = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(17);
const shared_lib_1 = __webpack_require__(18);
let BusinessUser = exports.BusinessUser = class BusinessUser extends mongoose_2.Document {
};
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], BusinessUser.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], BusinessUser.prototype, "password", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], BusinessUser.prototype, "isPasswordProtected", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], BusinessUser.prototype, "businesses", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], BusinessUser.prototype, "isDisabled", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], BusinessUser.prototype, "isStaff", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _b : Object)
], BusinessUser.prototype, "createdByBusinessId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], BusinessUser.prototype, "deleted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], BusinessUser.prototype, "preferredAlias", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], BusinessUser.prototype, "username", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], BusinessUser.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], BusinessUser.prototype, "isEmailVerified", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
    })),
    tslib_1.__metadata("design:type", typeof (_c = typeof shared_lib_1.WeekHoursType !== "undefined" && shared_lib_1.WeekHoursType) === "function" ? _c : Object)
], BusinessUser.prototype, "hours", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], BusinessUser.prototype, "displayName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], BusinessUser.prototype, "familyName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], BusinessUser.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], BusinessUser.prototype, "birthday", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], BusinessUser.prototype, "desiredCurrencies", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        countryCode: { type: String, default: "" },
        isRTL: { type: Boolean, default: true },
        languageCode: { type: String, default: "" },
        languageTag: { type: String, default: "" },
    })),
    tslib_1.__metadata("design:type", Object)
], BusinessUser.prototype, "locale", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        screenName: { type: String, default: "" },
        state: { type: Number, trim: true, default: 0 },
        isCompleted: { type: Boolean, default: false },
    })),
    tslib_1.__metadata("design:type", Object)
], BusinessUser.prototype, "registrationState", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], BusinessUser.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], BusinessUser.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], BusinessUser.prototype, "lastSignInAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: null }),
    tslib_1.__metadata("design:type", String)
], BusinessUser.prototype, "hashedRt", void 0);
exports.BusinessUser = BusinessUser = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ collection: "business-users" })
], BusinessUser);
exports.BusinessUserSchema = mongoose_1.SchemaFactory.createForClass(BusinessUser);


/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(42), exports);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
//user types
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.endpoints = exports.createEndpoint = void 0;
const createEndpoint = (endpoint, method) => {
    return {
        getConfig: (pathVars, queryParams) => {
            const url = endpoint
                .split("/")
                .map(part => (part.startsWith(":") ? pathVars.shift() : part))
                .join("/");
            const queryString = queryParams ? new URLSearchParams(queryParams ?? {}).toString() : undefined;
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


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERROR_CODES = void 0;
exports.ERROR_CODES = {
    11: { code: 11, description: "business categories error" },
    12: { code: 12, description: "business services error" },
    13: { code: 13, description: "users services error" },
    131: { code: 131, description: "users controller error" },
    14: { code: 14, description: "my business controller error" },
    15: { code: 15, description: "shortwaits default data controller error" },
    16: { code: 16, description: "server error," },
    20: { code: 20, description: "validation error" },
    21: { code: 21, description: "authorization error" },
    23: { code: 23, description: "mongo error" },
    25: { code: 25, description: "console log error" },
    26: { code: 26, description: "authorization error sign in" },
    27: { code: 27, description: "authorization error sign out" },
    28: { code: 28, description: "authorization error signup" },
};


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(31), exports);
tslib_1.__exportStar(__webpack_require__(32), exports);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.emojis = void 0;
exports.emojis = [
    "hash",
    "keycap_star",
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "copyright",
    "registered",
    "mahjong",
    "black_joker",
    "a",
    "b",
    "o2",
    "parking",
    "ab",
    "cl",
    "cool",
    "free",
    "id",
    "new",
    "ng",
    "ok",
    "sos",
    "up",
    "vs",
    "flag-ac",
    "flag-ad",
    "flag-ae",
    "flag-af",
    "flag-ag",
    "flag-ai",
    "flag-al",
    "flag-am",
    "flag-ao",
    "flag-aq",
    "flag-ar",
    "flag-as",
    "flag-at",
    "flag-au",
    "flag-aw",
    "flag-ax",
    "flag-az",
    "flag-ba",
    "flag-bb",
    "flag-bd",
    "flag-be",
    "flag-bf",
    "flag-bg",
    "flag-bh",
    "flag-bi",
    "flag-bj",
    "flag-bl",
    "flag-bm",
    "flag-bn",
    "flag-bo",
    "flag-bq",
    "flag-br",
    "flag-bs",
    "flag-bt",
    "flag-bv",
    "flag-bw",
    "flag-by",
    "flag-bz",
    "flag-ca",
    "flag-cc",
    "flag-cd",
    "flag-cf",
    "flag-cg",
    "flag-ch",
    "flag-ci",
    "flag-ck",
    "flag-cl",
    "flag-cm",
    "cn",
    "flag-co",
    "flag-cp",
    "flag-cr",
    "flag-cu",
    "flag-cv",
    "flag-cw",
    "flag-cx",
    "flag-cy",
    "flag-cz",
    "de",
    "flag-dg",
    "flag-dj",
    "flag-dk",
    "flag-dm",
    "flag-do",
    "flag-dz",
    "flag-ea",
    "flag-ec",
    "flag-ee",
    "flag-eg",
    "flag-eh",
    "flag-er",
    "es",
    "flag-et",
    "flag-eu",
    "flag-fi",
    "flag-fj",
    "flag-fk",
    "flag-fm",
    "flag-fo",
    "fr",
    "flag-ga",
    "gb",
    "flag-gd",
    "flag-ge",
    "flag-gf",
    "flag-gg",
    "flag-gh",
    "flag-gi",
    "flag-gl",
    "flag-gm",
    "flag-gn",
    "flag-gp",
    "flag-gq",
    "flag-gr",
    "flag-gs",
    "flag-gt",
    "flag-gu",
    "flag-gw",
    "flag-gy",
    "flag-hk",
    "flag-hm",
    "flag-hn",
    "flag-hr",
    "flag-ht",
    "flag-hu",
    "flag-ic",
    "flag-id",
    "flag-ie",
    "flag-il",
    "flag-im",
    "flag-in",
    "flag-io",
    "flag-iq",
    "flag-ir",
    "flag-is",
    "it",
    "flag-je",
    "flag-jm",
    "flag-jo",
    "jp",
    "flag-ke",
    "flag-kg",
    "flag-kh",
    "flag-ki",
    "flag-km",
    "flag-kn",
    "flag-kp",
    "kr",
    "flag-kw",
    "flag-ky",
    "flag-kz",
    "flag-la",
    "flag-lb",
    "flag-lc",
    "flag-li",
    "flag-lk",
    "flag-lr",
    "flag-ls",
    "flag-lt",
    "flag-lu",
    "flag-lv",
    "flag-ly",
    "flag-ma",
    "flag-mc",
    "flag-md",
    "flag-me",
    "flag-mf",
    "flag-mg",
    "flag-mh",
    "flag-mk",
    "flag-ml",
    "flag-mm",
    "flag-mn",
    "flag-mo",
    "flag-mp",
    "flag-mq",
    "flag-mr",
    "flag-ms",
    "flag-mt",
    "flag-mu",
    "flag-mv",
    "flag-mw",
    "flag-mx",
    "flag-my",
    "flag-mz",
    "flag-na",
    "flag-nc",
    "flag-ne",
    "flag-nf",
    "flag-ng",
    "flag-ni",
    "flag-nl",
    "flag-no",
    "flag-np",
    "flag-nr",
    "flag-nu",
    "flag-nz",
    "flag-om",
    "flag-pa",
    "flag-pe",
    "flag-pf",
    "flag-pg",
    "flag-ph",
    "flag-pk",
    "flag-pl",
    "flag-pm",
    "flag-pn",
    "flag-pr",
    "flag-ps",
    "flag-pt",
    "flag-pw",
    "flag-py",
    "flag-qa",
    "flag-re",
    "flag-ro",
    "flag-rs",
    "ru",
    "flag-rw",
    "flag-sa",
    "flag-sb",
    "flag-sc",
    "flag-sd",
    "flag-se",
    "flag-sg",
    "flag-sh",
    "flag-si",
    "flag-sj",
    "flag-sk",
    "flag-sl",
    "flag-sm",
    "flag-sn",
    "flag-so",
    "flag-sr",
    "flag-ss",
    "flag-st",
    "flag-sv",
    "flag-sx",
    "flag-sy",
    "flag-sz",
    "flag-ta",
    "flag-tc",
    "flag-td",
    "flag-tf",
    "flag-tg",
    "flag-th",
    "flag-tj",
    "flag-tk",
    "flag-tl",
    "flag-tm",
    "flag-tn",
    "flag-to",
    "flag-tr",
    "flag-tt",
    "flag-tv",
    "flag-tw",
    "flag-tz",
    "flag-ua",
    "flag-ug",
    "flag-um",
    "flag-un",
    "us",
    "flag-uy",
    "flag-uz",
    "flag-va",
    "flag-vc",
    "flag-ve",
    "flag-vg",
    "flag-vi",
    "flag-vn",
    "flag-vu",
    "flag-wf",
    "flag-ws",
    "flag-xk",
    "flag-ye",
    "flag-yt",
    "flag-za",
    "flag-zm",
    "flag-zw",
    "koko",
    "sa",
    "u7121",
    "u6307",
    "u7981",
    "u7a7a",
    "u5408",
    "u6e80",
    "u6709",
    "u6708",
    "u7533",
    "u5272",
    "u55b6",
    "ideograph_advantage",
    "accept",
    "cyclone",
    "foggy",
    "closed_umbrella",
    "night_with_stars",
    "sunrise_over_mountains",
    "sunrise",
    "city_sunset",
    "city_sunrise",
    "rainbow",
    "bridge_at_night",
    "ocean",
    "volcano",
    "milky_way",
    "earth_africa",
    "earth_americas",
    "earth_asia",
    "globe_with_meridians",
    "new_moon",
    "waxing_crescent_moon",
    "first_quarter_moon",
    "moon",
    "full_moon",
    "waning_gibbous_moon",
    "last_quarter_moon",
    "waning_crescent_moon",
    "crescent_moon",
    "new_moon_with_face",
    "first_quarter_moon_with_face",
    "last_quarter_moon_with_face",
    "full_moon_with_face",
    "sun_with_face",
    "star2",
    "stars",
    "thermometer",
    "mostly_sunny",
    "barely_sunny",
    "partly_sunny_rain",
    "rain_cloud",
    "snow_cloud",
    "lightning",
    "tornado",
    "fog",
    "wind_blowing_face",
    "hotdog",
    "taco",
    "burrito",
    "chestnut",
    "seedling",
    "evergreen_tree",
    "deciduous_tree",
    "palm_tree",
    "cactus",
    "hot_pepper",
    "tulip",
    "cherry_blossom",
    "rose",
    "hibiscus",
    "sunflower",
    "blossom",
    "corn",
    "ear_of_rice",
    "herb",
    "four_leaf_clover",
    "maple_leaf",
    "fallen_leaf",
    "leaves",
    "mushroom",
    "tomato",
    "eggplant",
    "grapes",
    "melon",
    "watermelon",
    "tangerine",
    "lemon",
    "banana",
    "pineapple",
    "apple",
    "green_apple",
    "pear",
    "peach",
    "cherries",
    "strawberry",
    "hamburger",
    "pizza",
    "meat_on_bone",
    "poultry_leg",
    "rice_cracker",
    "rice_ball",
    "rice",
    "curry",
    "ramen",
    "spaghetti",
    "bread",
    "fries",
    "sweet_potato",
    "dango",
    "oden",
    "sushi",
    "fried_shrimp",
    "fish_cake",
    "icecream",
    "shaved_ice",
    "ice_cream",
    "doughnut",
    "cookie",
    "chocolate_bar",
    "candy",
    "lollipop",
    "custard",
    "honey_pot",
    "cake",
    "bento",
    "stew",
    "fried_egg",
    "fork_and_knife",
    "tea",
    "sake",
    "wine_glass",
    "cocktail",
    "tropical_drink",
    "beer",
    "beers",
    "baby_bottle",
    "knife_fork_plate",
    "champagne",
    "popcorn",
    "ribbon",
    "gift",
    "birthday",
    "jack_o_lantern",
    "christmas_tree",
    "santa",
    "fireworks",
    "sparkler",
    "balloon",
    "tada",
    "confetti_ball",
    "tanabata_tree",
    "crossed_flags",
    "bamboo",
    "dolls",
    "flags",
    "wind_chime",
    "rice_scene",
    "school_satchel",
    "mortar_board",
    "medal",
    "reminder_ribbon",
    "studio_microphone",
    "level_slider",
    "control_knobs",
    "film_frames",
    "admission_tickets",
    "carousel_horse",
    "ferris_wheel",
    "roller_coaster",
    "fishing_pole_and_fish",
    "microphone",
    "movie_camera",
    "cinema",
    "headphones",
    "art",
    "tophat",
    "circus_tent",
    "ticket",
    "clapper",
    "performing_arts",
    "video_game",
    "dart",
    "slot_machine",
    "8ball",
    "game_die",
    "bowling",
    "flower_playing_cards",
    "musical_note",
    "notes",
    "saxophone",
    "guitar",
    "musical_keyboard",
    "trumpet",
    "violin",
    "musical_score",
    "running_shirt_with_sash",
    "tennis",
    "ski",
    "basketball",
    "checkered_flag",
    "snowboarder",
    "woman-running",
    "man-running",
    "runner",
    "woman-surfing",
    "man-surfing",
    "surfer",
    "sports_medal",
    "trophy",
    "horse_racing",
    "football",
    "rugby_football",
    "woman-swimming",
    "man-swimming",
    "swimmer",
    "woman-lifting-weights",
    "man-lifting-weights",
    "weight_lifter",
    "woman-golfing",
    "man-golfing",
    "golfer",
    "racing_motorcycle",
    "racing_car",
    "cricket_bat_and_ball",
    "volleyball",
    "field_hockey_stick_and_ball",
    "ice_hockey_stick_and_puck",
    "table_tennis_paddle_and_ball",
    "snow_capped_mountain",
    "camping",
    "beach_with_umbrella",
    "building_construction",
    "house_buildings",
    "cityscape",
    "derelict_house_building",
    "classical_building",
    "desert",
    "desert_island",
    "national_park",
    "stadium",
    "house",
    "house_with_garden",
    "office",
    "post_office",
    "european_post_office",
    "hospital",
    "bank",
    "atm",
    "hotel",
    "love_hotel",
    "convenience_store",
    "school",
    "department_store",
    "factory",
    "izakaya_lantern",
    "japanese_castle",
    "european_castle",
    "rainbow-flag",
    "transgender_flag",
    "waving_white_flag",
    "pirate_flag",
    "flag-england",
    "flag-scotland",
    "flag-wales",
    "waving_black_flag",
    "rosette",
    "label",
    "badminton_racquet_and_shuttlecock",
    "bow_and_arrow",
    "amphora",
    "skin-tone-2",
    "skin-tone-3",
    "skin-tone-4",
    "skin-tone-5",
    "skin-tone-6",
    "rat",
    "mouse2",
    "ox",
    "water_buffalo",
    "cow2",
    "tiger2",
    "leopard",
    "rabbit2",
    "black_cat",
    "cat2",
    "dragon",
    "crocodile",
    "whale2",
    "snail",
    "snake",
    "racehorse",
    "ram",
    "goat",
    "sheep",
    "monkey",
    "rooster",
    "chicken",
    "service_dog",
    "dog2",
    "pig2",
    "boar",
    "elephant",
    "octopus",
    "shell",
    "bug",
    "ant",
    "bee",
    "ladybug",
    "fish",
    "tropical_fish",
    "blowfish",
    "turtle",
    "hatching_chick",
    "baby_chick",
    "hatched_chick",
    "bird",
    "penguin",
    "koala",
    "poodle",
    "dromedary_camel",
    "camel",
    "dolphin",
    "mouse",
    "cow",
    "tiger",
    "rabbit",
    "cat",
    "dragon_face",
    "whale",
    "horse",
    "monkey_face",
    "dog",
    "pig",
    "frog",
    "hamster",
    "wolf",
    "polar_bear",
    "bear",
    "panda_face",
    "pig_nose",
    "feet",
    "chipmunk",
    "eyes",
    "eye-in-speech-bubble",
    "eye",
    "ear",
    "nose",
    "lips",
    "tongue",
    "point_up_2",
    "point_down",
    "point_left",
    "point_right",
    "facepunch",
    "wave",
    "ok_hand",
    "+1",
    "-1",
    "clap",
    "open_hands",
    "crown",
    "womans_hat",
    "eyeglasses",
    "necktie",
    "shirt",
    "jeans",
    "dress",
    "kimono",
    "bikini",
    "womans_clothes",
    "purse",
    "handbag",
    "pouch",
    "mans_shoe",
    "athletic_shoe",
    "high_heel",
    "sandal",
    "boot",
    "footprints",
    "bust_in_silhouette",
    "busts_in_silhouette",
    "boy",
    "girl",
    "male-farmer",
    "male-cook",
    "man_feeding_baby",
    "male-student",
    "male-singer",
    "male-artist",
    "male-teacher",
    "male-factory-worker",
    "man-boy-boy",
    "man-boy",
    "man-girl-boy",
    "man-girl-girl",
    "man-girl",
    "man-man-boy",
    "man-man-boy-boy",
    "man-man-girl",
    "man-man-girl-boy",
    "man-man-girl-girl",
    "man-woman-boy",
    "man-woman-boy-boy",
    "man-woman-girl",
    "man-woman-girl-boy",
    "man-woman-girl-girl",
    "male-technologist",
    "male-office-worker",
    "male-mechanic",
    "male-scientist",
    "male-astronaut",
    "male-firefighter",
    "man_with_probing_cane",
    "red_haired_man",
    "curly_haired_man",
    "bald_man",
    "white_haired_man",
    "man_in_motorized_wheelchair",
    "man_in_manual_wheelchair",
    "male-doctor",
    "male-judge",
    "male-pilot",
    "man-heart-man",
    "man-kiss-man",
    "man",
    "female-farmer",
    "female-cook",
    "woman_feeding_baby",
    "female-student",
    "female-singer",
    "female-artist",
    "female-teacher",
    "female-factory-worker",
    "woman-boy-boy",
    "woman-boy",
    "woman-girl-boy",
    "woman-girl-girl",
    "woman-girl",
    "woman-woman-boy",
    "woman-woman-boy-boy",
    "woman-woman-girl",
    "woman-woman-girl-boy",
    "woman-woman-girl-girl",
    "female-technologist",
    "female-office-worker",
    "female-mechanic",
    "female-scientist",
    "female-astronaut",
    "female-firefighter",
    "woman_with_probing_cane",
    "red_haired_woman",
    "curly_haired_woman",
    "bald_woman",
    "white_haired_woman",
    "woman_in_motorized_wheelchair",
    "woman_in_manual_wheelchair",
    "female-doctor",
    "female-judge",
    "female-pilot",
    "woman-heart-man",
    "woman-heart-woman",
    "woman-kiss-man",
    "woman-kiss-woman",
    "woman",
    "family",
    "man_and_woman_holding_hands",
    "two_men_holding_hands",
    "two_women_holding_hands",
    "female-police-officer",
    "male-police-officer",
    "cop",
    "women-with-bunny-ears-partying",
    "men-with-bunny-ears-partying",
    "dancers",
    "woman_with_veil",
    "man_with_veil",
    "bride_with_veil",
    "blond-haired-woman",
    "blond-haired-man",
    "person_with_blond_hair",
    "man_with_gua_pi_mao",
    "woman-wearing-turban",
    "man-wearing-turban",
    "man_with_turban",
    "older_man",
    "older_woman",
    "baby",
    "female-construction-worker",
    "male-construction-worker",
    "construction_worker",
    "princess",
    "japanese_ogre",
    "japanese_goblin",
    "ghost",
    "angel",
    "alien",
    "space_invader",
    "imp",
    "skull",
    "woman-tipping-hand",
    "man-tipping-hand",
    "information_desk_person",
    "female-guard",
    "male-guard",
    "guardsman",
    "dancer",
    "lipstick",
    "nail_care",
    "woman-getting-massage",
    "man-getting-massage",
    "massage",
    "woman-getting-haircut",
    "man-getting-haircut",
    "haircut",
    "barber",
    "syringe",
    "pill",
    "kiss",
    "love_letter",
    "ring",
    "gem",
    "couplekiss",
    "bouquet",
    "couple_with_heart",
    "wedding",
    "heartbeat",
    "broken_heart",
    "two_hearts",
    "sparkling_heart",
    "heartpulse",
    "cupid",
    "blue_heart",
    "green_heart",
    "yellow_heart",
    "purple_heart",
    "gift_heart",
    "revolving_hearts",
    "heart_decoration",
    "diamond_shape_with_a_dot_inside",
    "bulb",
    "anger",
    "bomb",
    "zzz",
    "boom",
    "sweat_drops",
    "droplet",
    "dash",
    "hankey",
    "muscle",
    "dizzy",
    "speech_balloon",
    "thought_balloon",
    "white_flower",
    "100",
    "moneybag",
    "currency_exchange",
    "heavy_dollar_sign",
    "credit_card",
    "yen",
    "dollar",
    "euro",
    "pound",
    "money_with_wings",
    "chart",
    "seat",
    "computer",
    "briefcase",
    "minidisc",
    "floppy_disk",
    "cd",
    "dvd",
    "file_folder",
    "open_file_folder",
    "page_with_curl",
    "page_facing_up",
    "date",
    "calendar",
    "card_index",
    "chart_with_upwards_trend",
    "chart_with_downwards_trend",
    "bar_chart",
    "clipboard",
    "pushpin",
    "round_pushpin",
    "paperclip",
    "straight_ruler",
    "triangular_ruler",
    "bookmark_tabs",
    "ledger",
    "notebook",
    "notebook_with_decorative_cover",
    "closed_book",
    "book",
    "green_book",
    "blue_book",
    "orange_book",
    "books",
    "name_badge",
    "scroll",
    "memo",
    "telephone_receiver",
    "pager",
    "fax",
    "satellite_antenna",
    "loudspeaker",
    "mega",
    "outbox_tray",
    "inbox_tray",
    "package",
    "e-mail",
    "incoming_envelope",
    "envelope_with_arrow",
    "mailbox_closed",
    "mailbox",
    "mailbox_with_mail",
    "mailbox_with_no_mail",
    "postbox",
    "postal_horn",
    "newspaper",
    "iphone",
    "calling",
    "vibration_mode",
    "mobile_phone_off",
    "no_mobile_phones",
    "signal_strength",
    "camera",
    "camera_with_flash",
    "video_camera",
    "tv",
    "radio",
    "vhs",
    "film_projector",
    "prayer_beads",
    "twisted_rightwards_arrows",
    "repeat",
    "repeat_one",
    "arrows_clockwise",
    "arrows_counterclockwise",
    "low_brightness",
    "high_brightness",
    "mute",
    "speaker",
    "sound",
    "loud_sound",
    "battery",
    "electric_plug",
    "mag",
    "mag_right",
    "lock_with_ink_pen",
    "closed_lock_with_key",
    "key",
    "lock",
    "unlock",
    "bell",
    "no_bell",
    "bookmark",
    "link",
    "radio_button",
    "back",
    "end",
    "on",
    "soon",
    "top",
    "underage",
    "keycap_ten",
    "capital_abcd",
    "abcd",
    "1234",
    "symbols",
    "abc",
    "fire",
    "flashlight",
    "wrench",
    "hammer",
    "nut_and_bolt",
    "hocho",
    "gun",
    "microscope",
    "telescope",
    "crystal_ball",
    "six_pointed_star",
    "beginner",
    "trident",
    "black_square_button",
    "white_square_button",
    "red_circle",
    "large_blue_circle",
    "large_orange_diamond",
    "large_blue_diamond",
    "small_orange_diamond",
    "small_blue_diamond",
    "small_red_triangle",
    "small_red_triangle_down",
    "arrow_up_small",
    "arrow_down_small",
    "om_symbol",
    "dove_of_peace",
    "kaaba",
    "mosque",
    "synagogue",
    "menorah_with_nine_branches",
    "clock1",
    "clock2",
    "clock3",
    "clock4",
    "clock5",
    "clock6",
    "clock7",
    "clock8",
    "clock9",
    "clock10",
    "clock11",
    "clock12",
    "clock130",
    "clock230",
    "clock330",
    "clock430",
    "clock530",
    "clock630",
    "clock730",
    "clock830",
    "clock930",
    "clock1030",
    "clock1130",
    "clock1230",
    "candle",
    "mantelpiece_clock",
    "hole",
    "man_in_business_suit_levitating",
    "female-detective",
    "male-detective",
    "sleuth_or_spy",
    "dark_sunglasses",
    "spider",
    "spider_web",
    "joystick",
    "man_dancing",
    "linked_paperclips",
    "lower_left_ballpoint_pen",
    "lower_left_fountain_pen",
    "lower_left_paintbrush",
    "lower_left_crayon",
    "raised_hand_with_fingers_splayed",
    "middle_finger",
    "spock-hand",
    "black_heart",
    "desktop_computer",
    "printer",
    "three_button_mouse",
    "trackball",
    "frame_with_picture",
    "card_index_dividers",
    "card_file_box",
    "file_cabinet",
    "wastebasket",
    "spiral_note_pad",
    "spiral_calendar_pad",
    "compression",
    "old_key",
    "rolled_up_newspaper",
    "dagger_knife",
    "speaking_head_in_silhouette",
    "left_speech_bubble",
    "right_anger_bubble",
    "ballot_box_with_ballot",
    "world_map",
    "mount_fuji",
    "tokyo_tower",
    "statue_of_liberty",
    "japan",
    "moyai",
    "grinning",
    "grin",
    "joy",
    "smiley",
    "smile",
    "sweat_smile",
    "laughing",
    "innocent",
    "smiling_imp",
    "wink",
    "blush",
    "yum",
    "relieved",
    "heart_eyes",
    "sunglasses",
    "smirk",
    "neutral_face",
    "expressionless",
    "unamused",
    "sweat",
    "pensive",
    "confused",
    "confounded",
    "kissing",
    "kissing_heart",
    "kissing_smiling_eyes",
    "kissing_closed_eyes",
    "stuck_out_tongue",
    "stuck_out_tongue_winking_eye",
    "stuck_out_tongue_closed_eyes",
    "disappointed",
    "worried",
    "angry",
    "rage",
    "cry",
    "persevere",
    "triumph",
    "disappointed_relieved",
    "frowning",
    "anguished",
    "fearful",
    "weary",
    "sleepy",
    "tired_face",
    "grimacing",
    "sob",
    "face_exhaling",
    "open_mouth",
    "hushed",
    "cold_sweat",
    "scream",
    "astonished",
    "flushed",
    "sleeping",
    "face_with_spiral_eyes",
    "dizzy_face",
    "face_in_clouds",
    "no_mouth",
    "mask",
    "smile_cat",
    "joy_cat",
    "smiley_cat",
    "heart_eyes_cat",
    "smirk_cat",
    "kissing_cat",
    "pouting_cat",
    "crying_cat_face",
    "scream_cat",
    "slightly_frowning_face",
    "slightly_smiling_face",
    "upside_down_face",
    "face_with_rolling_eyes",
    "woman-gesturing-no",
    "man-gesturing-no",
    "no_good",
    "woman-gesturing-ok",
    "man-gesturing-ok",
    "ok_woman",
    "woman-bowing",
    "man-bowing",
    "bow",
    "see_no_evil",
    "hear_no_evil",
    "speak_no_evil",
    "woman-raising-hand",
    "man-raising-hand",
    "raising_hand",
    "raised_hands",
    "woman-frowning",
    "man-frowning",
    "person_frowning",
    "woman-pouting",
    "man-pouting",
    "person_with_pouting_face",
    "pray",
    "rocket",
    "helicopter",
    "steam_locomotive",
    "railway_car",
    "bullettrain_side",
    "bullettrain_front",
    "train2",
    "metro",
    "light_rail",
    "station",
    "tram",
    "train",
    "bus",
    "oncoming_bus",
    "trolleybus",
    "busstop",
    "minibus",
    "ambulance",
    "fire_engine",
    "police_car",
    "oncoming_police_car",
    "taxi",
    "oncoming_taxi",
    "car",
    "oncoming_automobile",
    "blue_car",
    "truck",
    "articulated_lorry",
    "tractor",
    "monorail",
    "mountain_railway",
    "suspension_railway",
    "mountain_cableway",
    "aerial_tramway",
    "ship",
    "woman-rowing-boat",
    "man-rowing-boat",
    "rowboat",
    "speedboat",
    "traffic_light",
    "vertical_traffic_light",
    "construction",
    "rotating_light",
    "triangular_flag_on_post",
    "door",
    "no_entry_sign",
    "smoking",
    "no_smoking",
    "put_litter_in_its_place",
    "do_not_litter",
    "potable_water",
    "non-potable_water",
    "bike",
    "no_bicycles",
    "woman-biking",
    "man-biking",
    "bicyclist",
    "woman-mountain-biking",
    "man-mountain-biking",
    "mountain_bicyclist",
    "woman-walking",
    "man-walking",
    "walking",
    "no_pedestrians",
    "children_crossing",
    "mens",
    "womens",
    "restroom",
    "baby_symbol",
    "toilet",
    "wc",
    "shower",
    "bath",
    "bathtub",
    "passport_control",
    "customs",
    "baggage_claim",
    "left_luggage",
    "couch_and_lamp",
    "sleeping_accommodation",
    "shopping_bags",
    "bellhop_bell",
    "bed",
    "place_of_worship",
    "octagonal_sign",
    "shopping_trolley",
    "hindu_temple",
    "hut",
    "elevator",
    "playground_slide",
    "wheel",
    "ring_buoy",
    "hammer_and_wrench",
    "shield",
    "oil_drum",
    "motorway",
    "railway_track",
    "motor_boat",
    "small_airplane",
    "airplane_departure",
    "airplane_arriving",
    "satellite",
    "passenger_ship",
    "scooter",
    "motor_scooter",
    "canoe",
    "sled",
    "flying_saucer",
    "skateboard",
    "auto_rickshaw",
    "pickup_truck",
    "roller_skate",
    "large_orange_circle",
    "large_yellow_circle",
    "large_green_circle",
    "large_purple_circle",
    "large_brown_circle",
    "large_red_square",
    "large_blue_square",
    "large_orange_square",
    "large_yellow_square",
    "large_green_square",
    "large_purple_square",
    "large_brown_square",
    "heavy_equals_sign",
    "pinched_fingers",
    "white_heart",
    "brown_heart",
    "pinching_hand",
    "zipper_mouth_face",
    "money_mouth_face",
    "face_with_thermometer",
    "nerd_face",
    "thinking_face",
    "face_with_head_bandage",
    "robot_face",
    "hugging_face",
    "the_horns",
    "call_me_hand",
    "raised_back_of_hand",
    "left-facing_fist",
    "right-facing_fist",
    "handshake",
    "crossed_fingers",
    "i_love_you_hand_sign",
    "face_with_cowboy_hat",
    "clown_face",
    "nauseated_face",
    "rolling_on_the_floor_laughing",
    "drooling_face",
    "lying_face",
    "woman-facepalming",
    "man-facepalming",
    "face_palm",
    "sneezing_face",
    "face_with_raised_eyebrow",
    "star-struck",
    "zany_face",
    "shushing_face",
    "face_with_symbols_on_mouth",
    "face_with_hand_over_mouth",
    "face_vomiting",
    "exploding_head",
    "pregnant_woman",
    "breast-feeding",
    "palms_up_together",
    "selfie",
    "prince",
    "woman_in_tuxedo",
    "man_in_tuxedo",
    "person_in_tuxedo",
    "mrs_claus",
    "woman-shrugging",
    "man-shrugging",
    "shrug",
    "woman-cartwheeling",
    "man-cartwheeling",
    "person_doing_cartwheel",
    "woman-juggling",
    "man-juggling",
    "juggling",
    "fencer",
    "woman-wrestling",
    "man-wrestling",
    "wrestlers",
    "woman-playing-water-polo",
    "man-playing-water-polo",
    "water_polo",
    "woman-playing-handball",
    "man-playing-handball",
    "handball",
    "diving_mask",
    "wilted_flower",
    "drum_with_drumsticks",
    "clinking_glasses",
    "tumbler_glass",
    "spoon",
    "goal_net",
    "first_place_medal",
    "second_place_medal",
    "third_place_medal",
    "boxing_glove",
    "martial_arts_uniform",
    "curling_stone",
    "lacrosse",
    "softball",
    "flying_disc",
    "croissant",
    "avocado",
    "cucumber",
    "bacon",
    "potato",
    "carrot",
    "baguette_bread",
    "green_salad",
    "shallow_pan_of_food",
    "stuffed_flatbread",
    "egg",
    "glass_of_milk",
    "peanuts",
    "kiwifruit",
    "pancakes",
    "dumpling",
    "fortune_cookie",
    "takeout_box",
    "chopsticks",
    "bowl_with_spoon",
    "cup_with_straw",
    "coconut",
    "broccoli",
    "pie",
    "pretzel",
    "cut_of_meat",
    "sandwich",
    "canned_food",
    "leafy_green",
    "mango",
    "moon_cake",
    "bagel",
    "smiling_face_with_3_hearts",
    "yawning_face",
    "smiling_face_with_tear",
    "partying_face",
    "woozy_face",
    "hot_face",
    "cold_face",
    "ninja",
    "disguised_face",
    "face_holding_back_tears",
    "pleading_face",
    "sari",
    "lab_coat",
    "goggles",
    "hiking_boot",
    "womans_flat_shoe",
    "crab",
    "lion_face",
    "scorpion",
    "turkey",
    "unicorn_face",
    "eagle",
    "duck",
    "bat",
    "shark",
    "owl",
    "fox_face",
    "butterfly",
    "deer",
    "gorilla",
    "lizard",
    "rhinoceros",
    "shrimp",
    "squid",
    "giraffe_face",
    "zebra_face",
    "hedgehog",
    "sauropod",
    "t-rex",
    "cricket",
    "kangaroo",
    "llama",
    "peacock",
    "hippopotamus",
    "parrot",
    "raccoon",
    "lobster",
    "mosquito",
    "microbe",
    "badger",
    "swan",
    "mammoth",
    "dodo",
    "sloth",
    "otter",
    "orangutan",
    "skunk",
    "flamingo",
    "oyster",
    "beaver",
    "bison",
    "seal",
    "guide_dog",
    "probing_cane",
    "bone",
    "leg",
    "foot",
    "tooth",
    "female_superhero",
    "male_superhero",
    "superhero",
    "female_supervillain",
    "male_supervillain",
    "supervillain",
    "safety_vest",
    "ear_with_hearing_aid",
    "motorized_wheelchair",
    "manual_wheelchair",
    "mechanical_arm",
    "mechanical_leg",
    "cheese_wedge",
    "cupcake",
    "salt",
    "beverage_box",
    "garlic",
    "onion",
    "falafel",
    "waffle",
    "butter",
    "mate_drink",
    "ice_cube",
    "bubble_tea",
    "troll",
    "woman_standing",
    "man_standing",
    "standing_person",
    "woman_kneeling",
    "man_kneeling",
    "kneeling_person",
    "deaf_woman",
    "deaf_man",
    "deaf_person",
    "face_with_monocle",
    "farmer",
    "cook",
    "person_feeding_baby",
    "mx_claus",
    "student",
    "singer",
    "artist",
    "teacher",
    "factory_worker",
    "technologist",
    "office_worker",
    "mechanic",
    "scientist",
    "astronaut",
    "firefighter",
    "people_holding_hands",
    "person_with_probing_cane",
    "red_haired_person",
    "curly_haired_person",
    "bald_person",
    "white_haired_person",
    "person_in_motorized_wheelchair",
    "person_in_manual_wheelchair",
    "health_worker",
    "judge",
    "pilot",
    "adult",
    "child",
    "older_adult",
    "woman_with_beard",
    "man_with_beard",
    "bearded_person",
    "person_with_headscarf",
    "woman_in_steamy_room",
    "man_in_steamy_room",
    "person_in_steamy_room",
    "woman_climbing",
    "man_climbing",
    "person_climbing",
    "woman_in_lotus_position",
    "man_in_lotus_position",
    "person_in_lotus_position",
    "female_mage",
    "male_mage",
    "mage",
    "female_fairy",
    "male_fairy",
    "fairy",
    "female_vampire",
    "male_vampire",
    "vampire",
    "mermaid",
    "merman",
    "merperson",
    "female_elf",
    "male_elf",
    "elf",
    "female_genie",
    "male_genie",
    "genie",
    "female_zombie",
    "male_zombie",
    "zombie",
    "brain",
    "orange_heart",
    "billed_cap",
    "scarf",
    "gloves",
    "coat",
    "socks",
    "red_envelope",
    "firecracker",
    "jigsaw",
    "test_tube",
    "petri_dish",
    "dna",
    "compass",
    "abacus",
    "fire_extinguisher",
    "toolbox",
    "bricks",
    "magnet",
    "luggage",
    "lotion_bottle",
    "thread",
    "yarn",
    "safety_pin",
    "teddy_bear",
    "broom",
    "basket",
    "roll_of_paper",
    "soap",
    "sponge",
    "receipt",
    "nazar_amulet",
    "ballet_shoes",
    "one-piece_swimsuit",
    "briefs",
    "shorts",
    "thong_sandal",
    "drop_of_blood",
    "adhesive_bandage",
    "stethoscope",
    "x-ray",
    "crutch",
    "yo-yo",
    "kite",
    "parachute",
    "boomerang",
    "magic_wand",
    "pinata",
    "nesting_dolls",
    "ringed_planet",
    "chair",
    "razor",
    "axe",
    "diya_lamp",
    "banjo",
    "military_helmet",
    "accordion",
    "long_drum",
    "coin",
    "carpentry_saw",
    "screwdriver",
    "ladder",
    "hook",
    "mirror",
    "window",
    "plunger",
    "sewing_needle",
    "knot",
    "bucket",
    "mouse_trap",
    "toothbrush",
    "headstone",
    "placard",
    "rock",
    "mirror_ball",
    "identification_card",
    "low_battery",
    "hamsa",
    "fly",
    "worm",
    "beetle",
    "cockroach",
    "potted_plant",
    "wood",
    "feather",
    "lotus",
    "coral",
    "empty_nest",
    "nest_with_eggs",
    "anatomical_heart",
    "lungs",
    "people_hugging",
    "pregnant_man",
    "pregnant_person",
    "person_with_crown",
    "blueberries",
    "bell_pepper",
    "olive",
    "flatbread",
    "tamale",
    "fondue",
    "teapot",
    "pouring_liquid",
    "beans",
    "jar",
    "melting_face",
    "saluting_face",
    "face_with_open_eyes_and_hand_over_mouth",
    "face_with_peeking_eye",
    "face_with_diagonal_mouth",
    "dotted_line_face",
    "biting_lip",
    "bubbles",
    "hand_with_index_finger_and_thumb_crossed",
    "rightwards_hand",
    "leftwards_hand",
    "palm_down_hand",
    "palm_up_hand",
    "index_pointing_at_the_viewer",
    "heart_hands",
    "bangbang",
    "interrobang",
    "tm",
    "information_source",
    "left_right_arrow",
    "arrow_up_down",
    "arrow_upper_left",
    "arrow_upper_right",
    "arrow_lower_right",
    "arrow_lower_left",
    "leftwards_arrow_with_hook",
    "arrow_right_hook",
    "watch",
    "hourglass",
    "keyboard",
    "eject",
    "fast_forward",
    "rewind",
    "arrow_double_up",
    "arrow_double_down",
    "black_right_pointing_double_triangle_with_vertical_bar",
    "black_left_pointing_double_triangle_with_vertical_bar",
    "black_right_pointing_triangle_with_double_vertical_bar",
    "alarm_clock",
    "stopwatch",
    "timer_clock",
    "hourglass_flowing_sand",
    "double_vertical_bar",
    "black_square_for_stop",
    "black_circle_for_record",
    "m",
    "black_small_square",
    "white_small_square",
    "arrow_forward",
    "arrow_backward",
    "white_medium_square",
    "black_medium_square",
    "white_medium_small_square",
    "black_medium_small_square",
    "sunny",
    "cloud",
    "umbrella",
    "snowman",
    "comet",
    "phone",
    "ballot_box_with_check",
    "umbrella_with_rain_drops",
    "coffee",
    "shamrock",
    "point_up",
    "skull_and_crossbones",
    "radioactive_sign",
    "biohazard_sign",
    "orthodox_cross",
    "star_and_crescent",
    "peace_symbol",
    "yin_yang",
    "wheel_of_dharma",
    "white_frowning_face",
    "relaxed",
    "female_sign",
    "male_sign",
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpius",
    "sagittarius",
    "capricorn",
    "aquarius",
    "pisces",
    "chess_pawn",
    "spades",
    "clubs",
    "hearts",
    "diamonds",
    "hotsprings",
    "recycle",
    "infinity",
    "wheelchair",
    "hammer_and_pick",
    "anchor",
    "crossed_swords",
    "medical_symbol",
    "scales",
    "alembic",
    "gear",
    "atom_symbol",
    "fleur_de_lis",
    "warning",
    "zap",
    "transgender_symbol",
    "white_circle",
    "black_circle",
    "coffin",
    "funeral_urn",
    "soccer",
    "baseball",
    "snowman_without_snow",
    "partly_sunny",
    "thunder_cloud_and_rain",
    "ophiuchus",
    "pick",
    "helmet_with_white_cross",
    "chains",
    "no_entry",
    "shinto_shrine",
    "church",
    "mountain",
    "umbrella_on_ground",
    "fountain",
    "golf",
    "ferry",
    "boat",
    "skier",
    "ice_skate",
    "woman-bouncing-ball",
    "man-bouncing-ball",
    "person_with_ball",
    "tent",
    "fuelpump",
    "scissors",
    "white_check_mark",
    "airplane",
    "email",
    "fist",
    "hand",
    "v",
    "writing_hand",
    "pencil2",
    "black_nib",
    "heavy_check_mark",
    "heavy_multiplication_x",
    "latin_cross",
    "star_of_david",
    "sparkles",
    "eight_spoked_asterisk",
    "eight_pointed_black_star",
    "snowflake",
    "sparkle",
    "x",
    "negative_squared_cross_mark",
    "question",
    "grey_question",
    "grey_exclamation",
    "exclamation",
    "heavy_heart_exclamation_mark_ornament",
    "heart_on_fire",
    "mending_heart",
    "heart",
    "heavy_plus_sign",
    "heavy_minus_sign",
    "heavy_division_sign",
    "arrow_right",
    "curly_loop",
    "loop",
    "arrow_heading_up",
    "arrow_heading_down",
    "arrow_left",
    "arrow_up",
    "arrow_down",
    "black_large_square",
    "white_large_square",
    "star",
    "o",
    "wavy_dash",
    "part_alternation_mark",
    "congratulations",
    "secret",
];


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);
tslib_1.__exportStar(__webpack_require__(39), exports);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(41), exports);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.eventPaymentMethodsKeys = exports.eventPaymentMethods = exports.eventStatusNames = void 0;
exports.eventStatusNames = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    CANCELED: "CANCELED",
    COMPLETED: "COMPLETED",
};
exports.eventPaymentMethods = {
    CASH: "Cash",
    CREDIT_CARD: "Credit Card",
    ZELLE: "Zelle",
    PAYPAL: "Paypal",
    APPLE_PAY: "Apple Pay",
    GOOGLE_PAY: "Google Pay",
    BITCOIN: "Bitcoin",
    CASH_APP: "Cash App",
};
exports.eventPaymentMethodsKeys = Object.keys(exports.eventPaymentMethods);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WEEKDAYS_ARR = exports.WEEKDAYS = void 0;
exports.WEEKDAYS = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
};
exports.WEEKDAYS_ARR = Object.keys(exports.WEEKDAYS);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(43), exports);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateAvatarUrl = void 0;
const generateAvatarUrl = (name) => {
    const nameArr = name.split(" ");
    const firstLetter = nameArr[0].charAt(0);
    const secondLetter = nameArr[1] ? nameArr[1].charAt(0) : "";
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `https://ui-avatars.com/api/?name=${firstLetter}${secondLetter}&background=${randomColor}&color=fff`;
};
exports.generateAvatarUrl = generateAvatarUrl;


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessSchema = exports.Business = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(10);
const mongoose_2 = __webpack_require__(17);
const shared_lib_1 = __webpack_require__(18);
const swagger_1 = __webpack_require__(5);
let Business = exports.Business = class Business extends mongoose_2.Document {
};
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Business.prototype, "shortId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Business.prototype, "isDisabled", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Business.prototype, "isWebBookingEnabled", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Business.prototype, "isSmsNotificationEnabled", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Business.prototype, "isAppNotificationEnabled", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "videoConference", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Business.prototype, "isVideoConferenceEnabled", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Business.prototype, "supportEmail", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Business.prototype, "supportPhone", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "labels", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Business.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "events", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "admins", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "superAdmins", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "backgroundAdmins", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: String, default: "free" }),
    tslib_1.__metadata("design:type", typeof (_a = typeof shared_lib_1.AccountType !== "undefined" && shared_lib_1.AccountType) === "function" ? _a : Object)
], Business.prototype, "accountType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "staff", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "categories", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "services", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Business.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        name: String,
        code: String,
        symbol: String,
        codeNumber: Number,
        decimalSeparator: Number,
    })),
    tslib_1.__metadata("design:type", typeof (_b = typeof shared_lib_1.CurrencyType !== "undefined" && shared_lib_1.CurrencyType) === "function" ? _b : Object)
], Business.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Business.prototype, "country", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Business.prototype, "phone1", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Business.prototype, "shortName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Business.prototype, "longName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
    })),
    tslib_1.__metadata("design:type", typeof (_c = typeof shared_lib_1.BusinessHoursType !== "undefined" && shared_lib_1.BusinessHoursType) === "function" ? _c : Object)
], Business.prototype, "hours", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        formattedAddress: String,
        streetAddress: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
        coordinates: [Number, Number],
    })),
    tslib_1.__metadata("design:type", typeof (_d = typeof shared_lib_1.BusinessLocationType !== "undefined" && shared_lib_1.BusinessLocationType) === "function" ? _d : Object)
], Business.prototype, "location", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Business.prototype, "isRegistrationCompleted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Business.prototype, "deleted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_f = typeof mongoose_2.Schema !== "undefined" && (_e = mongoose_2.Schema.Types) !== void 0 && _e.ObjectId) === "function" ? _f : Object)
], Business.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_h = typeof mongoose_2.Schema !== "undefined" && (_g = mongoose_2.Schema.Types) !== void 0 && _g.ObjectId) === "function" ? _h : Object)
], Business.prototype, "updatedBy", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "clients", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Business.prototype, "deliveryInfo", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "reservations", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "paymentMethods", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        isActive: { type: Boolean, default: false },
        baseUrl: String,
        bannerImageUrl: String,
        logoImageUrl: String,
        faviconImageUrl: String,
        primaryColor: String,
        secondaryColor: String,
        accentColor: String,
        notificationMessage: String,
    })),
    tslib_1.__metadata("design:type", Object)
], Business.prototype, "web", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        allowBooking: { type: Boolean, default: true },
        allowRescheduling: { type: Boolean, default: true },
        allowCancellation: { type: Boolean, default: true },
        allowPayment: { type: Boolean, default: true },
        allowCheckIn: { type: Boolean, default: true },
        allowCheckOut: { type: Boolean, default: true },
        allowNoShow: { type: Boolean, default: true },
        allowWaitlist: { type: Boolean, default: true },
    })),
    tslib_1.__metadata("design:type", Object)
], Business.prototype, "booking", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Business.prototype, "taggedClients", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Date, default: Date.now }),
    tslib_1.__metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
], Business.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Date, default: Date.now }),
    tslib_1.__metadata("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
], Business.prototype, "updatedAt", void 0);
exports.Business = Business = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Business);
exports.BusinessSchema = mongoose_1.SchemaFactory.createForClass(Business);
exports.BusinessSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceSchema = exports.Service = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(10);
const mongoose_2 = tslib_1.__importStar(__webpack_require__(17));
const shared_lib_1 = __webpack_require__(18);
let Service = exports.Service = class Service extends mongoose_2.Document {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        staff: Array,
    })),
    tslib_1.__metadata("design:type", Array)
], Service.prototype, "staff", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        businessId: {
            type: mongoose_2.default.Schema.Types.ObjectId,
            require: true,
        },
    })),
    tslib_1.__metadata("design:type", typeof (_a = typeof shared_lib_1.ObjectId !== "undefined" && shared_lib_1.ObjectId) === "function" ? _a : Object)
], Service.prototype, "businessId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Service.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Service.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        mon: { type: Array },
        tue: { type: Array },
        wed: { type: Array },
        thu: { type: Array },
        fri: { type: Array },
        sat: { type: Array },
        sun: { type: Array },
    })),
    tslib_1.__metadata("design:type", typeof (_b = typeof shared_lib_1.BusinessHoursType !== "undefined" && shared_lib_1.BusinessHoursType) === "function" ? _b : Object)
], Service.prototype, "hours", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Service.prototype, "applicableCategories", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Service.prototype, "durationInMin", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Service.prototype, "price", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    tslib_1.__metadata("design:type", typeof (_c = typeof shared_lib_1.BusinessAvailableCurrenciesType !== "undefined" && shared_lib_1.BusinessAvailableCurrenciesType) === "function" ? _c : Object)
], Service.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Service.prototype, "isPrivate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        zoom: { type: String },
        other1: { type: String },
        other2: { type: String },
    })),
    tslib_1.__metadata("design:type", typeof (_d = typeof Record !== "undefined" && Record) === "function" ? _d : Object)
], Service.prototype, "urls", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Service.prototype, "isVideoConference", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Service.prototype, "deleted", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        colorId: { type: String },
        colorName: { type: String },
        hexCode: { type: String },
        isSelected: { type: Boolean },
        isDefault: { type: Boolean },
    })),
    tslib_1.__metadata("design:type", typeof (_e = typeof shared_lib_1.ServiceColorType !== "undefined" && shared_lib_1.ServiceColorType) === "function" ? _e : Object)
], Service.prototype, "serviceColor", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Service.prototype, "imageUrl", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        businessId: {
            type: mongoose_2.default.Schema.Types.ObjectId,
        },
    })),
    tslib_1.__metadata("design:type", typeof (_f = typeof shared_lib_1.ObjectId !== "undefined" && shared_lib_1.ObjectId) === "function" ? _f : Object)
], Service.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        businessId: {
            type: mongoose_2.default.Schema.Types.ObjectId,
        },
    })),
    tslib_1.__metadata("design:type", typeof (_g = typeof shared_lib_1.ObjectId !== "undefined" && shared_lib_1.ObjectId) === "function" ? _g : Object)
], Service.prototype, "updatedBy", void 0);
exports.Service = Service = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Service);
exports.ServiceSchema = mongoose_1.SchemaFactory.createForClass(Service);


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const auth_service_1 = __webpack_require__(47);
const sign_up_with_email_dto_1 = __webpack_require__(58);
const sign_in_with_email_dto_1 = __webpack_require__(61);
const sign_up_with_social_dto_1 = __webpack_require__(62);
const swagger_1 = __webpack_require__(5);
const auth_decorator_1 = __webpack_require__(63);
const guards_1 = __webpack_require__(64);
const auth_interface_1 = __webpack_require__(68);
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUpSocial(dto) {
        return this.authService.signUpSocial(dto);
    }
    async signInSocial(dto) {
        return this.authService.signInSocial(dto);
    }
    async signUpLocal(dto) {
        return this.authService.signUpLocal(dto);
    }
    async signInLocal(body) {
        console.log("signInLocal controller", body);
        return this.authService.signInLocal(body);
    }
    async logout(request) {
        console.log("logout controller", request.user.sub);
        await this.authService.logout(request.user.sub);
    }
    async refreshTokens(userId, refreshToken) {
        return this.authService.refreshTokens(userId, refreshToken);
    }
};
tslib_1.__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Post)("admin/social/sign-up"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Returns new business user (super Admin) & business record",
        type: auth_interface_1.AuthSuccessResponse,
    }),
    tslib_1.__param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof sign_up_with_social_dto_1.WithSocialAuthDto !== "undefined" && sign_up_with_social_dto_1.WithSocialAuthDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "signUpSocial", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Post)("admin/social/sign-in"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Returns new business user (super Admin) & business record",
        type: auth_interface_1.AuthSuccessResponse,
    }),
    tslib_1.__param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof sign_up_with_social_dto_1.WithSocialAuthDto !== "undefined" && sign_up_with_social_dto_1.WithSocialAuthDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "signInSocial", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Post)("admin/local/sign-up"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Returns new business user (super Admin) & business record",
        type: auth_interface_1.AuthSuccessResponse,
    }),
    tslib_1.__param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof sign_up_with_email_dto_1.SignUpWithEmailDto !== "undefined" && sign_up_with_email_dto_1.SignUpWithEmailDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "signUpLocal", null);
tslib_1.__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Post)("admin/local/sign-in"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns existing user record",
        type: auth_interface_1.AuthSuccessResponse,
    }),
    tslib_1.__param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof sign_in_with_email_dto_1.SignInWithEmailDto !== "undefined" && sign_in_with_email_dto_1.SignInWithEmailDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "signInLocal", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, swagger_1.ApiBearerAuth)("bearer"),
    (0, common_1.Post)("admin/local/sign-out"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Revokes tokens",
    }),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.RtGuard),
    (0, common_1.Post)("admin/local/refresh"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns refreshed token",
    }),
    tslib_1.__param(0, (0, auth_decorator_1.GetCurrentUserId)()),
    tslib_1.__param(1, (0, auth_decorator_1.GetCurrentUser)("refreshToken")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "refreshTokens", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)("auth"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(1);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortwaitsAdmin = __webpack_require__(48);
const common_1 = __webpack_require__(9);
const mongoose_1 = __webpack_require__(10);
const mongoose_2 = __webpack_require__(17);
const bcryptjs_1 = tslib_1.__importDefault(__webpack_require__(51));
const jwt_1 = __webpack_require__(15);
const config_1 = __webpack_require__(3);
const nanoid_1 = __webpack_require__(52);
const business_user_entity_1 = __webpack_require__(16);
const business_entity_1 = __webpack_require__(44);
const service_entity_1 = __webpack_require__(45);
const converters_1 = __webpack_require__(53);
const filtersForDtos_1 = __webpack_require__(54);
const google_auth_library_1 = __webpack_require__(55);
const rxjs_1 = __webpack_require__(56);
const generateUserPayload_1 = __webpack_require__(57);
const providers = ["google", "facebook"];
const googleApiOauthUrl = "https://www.googleapis.com/oauth2/v3";
let AuthService = exports.AuthService = class AuthService {
    constructor(businessUserModel, businessModel, serviceModel, jwtService, configService) {
        this.businessUserModel = businessUserModel;
        this.businessModel = businessModel;
        this.serviceModel = serviceModel;
        this.jwtService = jwtService;
        this.configService = configService;
        this.generateShortId = (0, nanoid_1.customAlphabet)("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 16);
        this.maxAttempts = 10;
        const googleAuthClientId = this.configService.get("GOOGLE_AUTH_CLIENT_ID");
        const googleAuthClientSecret = this.configService.get("GOOGLE_AUTH_CLIENT_SECRET");
        this.oAuth2Client = new google_auth_library_1.OAuth2Client(googleAuthClientId, googleAuthClientSecret);
    }
    async signUpSocial(dto) {
        if (!providers.includes(dto.provider)) {
            throw new common_1.UnprocessableEntityException("Invalid provider");
        }
        try {
            let userInfo;
            if (dto.provider === "google") {
                userInfo = await this.googleAuth(dto.authCode);
                // check if email is verified for google
            }
            else if (dto.provider === "facebook") {
                (0, rxjs_1.noop)();
                // check if email is verified for facebook
            }
            const user = await this.businessUserModel.findOne({
                email: userInfo.email,
                isEmailVerified: true,
            });
            if (user) {
                return await this.successfulExistingUser(user);
            }
            const newUser = (0, filtersForDtos_1.getNewUserFromSocialAccount)(userInfo);
            return await this.createNewBusinessAndBusinessOwner(newUser);
        }
        catch (error) {
            console.error("Error in signUpSocial:", error);
            throw new common_1.InternalServerErrorException("An error occurred while processing your request.");
        }
    }
    async signInSocial(dto) {
        if (!providers.includes(dto.provider)) {
            throw new common_1.UnprocessableEntityException("Invalid provider");
        }
        try {
            let userInfo;
            if (dto.provider === "google") {
                userInfo = await this.googleAuth(dto.authCode);
                // check if email is verified for google
            }
            else if (dto.provider === "facebook") {
                (0, rxjs_1.noop)();
                // check if email is verified for facebook
            }
            const user = await this.businessUserModel.findOne({
                email: userInfo.email,
                isEmailVerified: true,
            });
            if (!user) {
                const newUser = (0, filtersForDtos_1.getNewUserFromSocialAccount)(userInfo);
                return await this.createNewBusinessAndBusinessOwner(newUser);
            }
            return await this.successfulExistingUser(user);
        }
        catch (error) {
            console.error("Error in signInSocial:", error);
            throw new common_1.InternalServerErrorException("An error occurred while processing your request.");
        }
    }
    async signUpLocal(newBusinessUserDto) {
        const user = await this.businessUserModel.findOne({
            username: newBusinessUserDto.username,
        });
        if (user) {
            return await this.successfulExistingUser(user);
        }
        const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
        const salt = await bcryptjs_1.default.genSalt(saltRounds);
        const encodedPassword = await bcryptjs_1.default.hash(newBusinessUserDto.password, salt);
        const filteredBusinessUser = (0, filtersForDtos_1.getFilteredNewBusinessOwner)(newBusinessUserDto);
        return await this.createNewBusinessAndBusinessOwner({
            ...filteredBusinessUser,
            password: encodedPassword,
        });
    }
    async signInLocal(dto) {
        const user = await this.businessUserModel.findOne({
            username: (0, converters_1.convertDomainToLowercase)(dto.username), // todo: this might be a problem
        });
        if (!user) {
            throw new common_1.NotFoundException("User not registered");
        }
        const isPasswordValid = await bcryptjs_1.default.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.ForbiddenException("Invalid password or username");
        }
        return await this.successfulExistingUser(user);
    }
    async logout(userId) {
        console.log("logout user id: ", userId);
        await this.businessUserModel.findByIdAndUpdate(userId, {
            hashedRt: null,
        });
        return {
            auth: null,
            attributes: {
                currentBusinessAccounts: null,
                currentUser: null,
            },
        };
    }
    async refreshTokens(userId, rt) {
        const user = await this.businessUserModel.findById(userId).exec();
        if (!user) {
            throw new common_1.ForbiddenException("Unable to reauthenticate user");
        }
        const rtMatches = await bcryptjs_1.default.compare(rt, user.hashedRt);
        if (!rtMatches) {
            throw new common_1.ForbiddenException("Unable to reauthenticate");
        }
        const signedTokens = await this.signTokens(user);
        await this.updateUserRt(user, signedTokens.refreshToken);
        return { auth: signedTokens };
    }
    async updateUserRt(user, rt) {
        const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
        const salt = await bcryptjs_1.default.genSalt(saltRounds);
        const hash = await bcryptjs_1.default.hash(rt, salt);
        await this.businessUserModel.findByIdAndUpdate({ _id: user._id }, {
            hashedRt: hash,
            lastSignInAt: new Date(),
        });
    }
    async signTokens(userInfo) {
        const payload = { sub: userInfo._id, email: userInfo.email, username: userInfo.username };
        const [token, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get("AT_SECRET"),
                expiresIn: this.configService.get("AT_EXPIRES_IN"),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get("RT_SECRET"),
                expiresIn: this.configService.get("RT_EXPIRES_IN"),
            }),
        ]);
        return {
            token,
            refreshToken,
        };
    }
    async generateUniqueId() {
        for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
            const generatedId = this.generateShortId().toLowerCase();
            const existingEntity = await this.businessModel.findOne({ shortId: generatedId });
            if (!existingEntity) {
                return generatedId;
            }
        }
        return null; // Return null when the maximum attempts are reached
    }
    async googleAuth(authCode) {
        const { tokens } = await this.oAuth2Client.getToken(authCode);
        const userInfoResponse = await fetch(`${googleApiOauthUrl}/userinfo`, {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        });
        if (!userInfoResponse.ok) {
            throw new common_1.InternalServerErrorException("Failed to fetch user information from Google.");
        }
        return await userInfoResponse.json();
    }
    async successfulExistingUser(existingUser) {
        const signedTokens = await this.signTokens(existingUser);
        await this.updateUserRt(existingUser, signedTokens.refreshToken);
        delete existingUser.password;
        // todo:
        // this is a problem if
        // the user has multiple businesses or 0 businesses
        // the app will not sign in the user with out a business
        // app grabs the first business in the array if
        // there are multiple businesses
        const currentBusinessAccounts = await this.businessModel
            .find({
            _id: {
                $in: existingUser.businesses,
            },
        })
            .select("-__v");
        return {
            auth: signedTokens,
            attributes: {
                currentBusinessAccounts,
                currentUser: existingUser,
            },
        };
    }
    async createNewBusinessAndBusinessOwner(newUser) {
        const saltRounds = Number(this.configService.get("SALT_ROUNDS"));
        const salt = await bcryptjs_1.default.genSalt(saltRounds);
        const userPayload = (0, generateUserPayload_1.generateBusinessUser)(newUser);
        const currentUser = new this.businessUserModel(userPayload);
        const businessShortId = await this.generateUniqueId();
        if (!businessShortId) {
            throw new common_1.UnprocessableEntityException("Unable to create business account for user");
        }
        const baseUrl = `https://${businessShortId}.shortwaits.com`;
        const webLogoImageUrl = "https://img.icons8.com/bubbles/50/shop.png";
        const newBusinessPayload = {
            shortId: businessShortId,
            isRegistrationCompleted: false,
            web: {
                isActive: true,
                baseUrl,
                bannerImageUrl: "",
                logoImageUrl: webLogoImageUrl,
                faviconImageUrl: "",
                primaryColor: "",
                secondaryColor: "",
                accentColor: "",
                notificationMessage: "",
            },
            clients: null,
            taggedClients: null,
            admins: [currentUser._id],
            superAdmins: [currentUser._id],
            backgroundAdmins: [currentUser._id],
            createdBy: currentUser._id,
            updatedBy: currentUser._id,
            staff: [currentUser._id],
            hours: shortwaitsAdmin[0].sampleBusinessData.hours,
            labels: shortwaitsAdmin[0].sampleBusinessData.labels,
            email: "",
            categories: [],
            services: [],
            events: [],
            description: "",
            currency: {
                name: "",
                code: "",
                symbol: "",
                codeNumber: 0,
                decimalSeparator: 0,
            },
            country: "",
            phone1: "",
            shortName: "",
            longName: "",
            location: {
                formattedAddress: "",
                streetAddress: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
                coordinates: [0, 0],
            },
            deleted: false,
            accountType: "free",
            isWebBookingEnabled: true,
            isSmsNotificationEnabled: false,
            isAppNotificationEnabled: true,
            videoConference: [],
            isVideoConferenceEnabled: false,
            isDisabled: false,
        };
        const newBusinessAccount = new this.businessModel(newBusinessPayload);
        const services = shortwaitsAdmin[0].sampleBusinessData.services.map(service => {
            return { ...service, businessId: newBusinessAccount._id };
        });
        // create default labels (3) for the business from shortwaitsAdmin template
        const labels = shortwaitsAdmin[0].sampleBusinessData.labels;
        const newBusinessServices = await this.serviceModel.insertMany(services);
        const servicesIds = newBusinessServices.map(service => service._id);
        const tokens = await this.signTokens(currentUser);
        const hashedRefreshToken = await bcryptjs_1.default.hash(tokens.refreshToken, salt);
        newBusinessAccount.services = servicesIds;
        newBusinessAccount.labels = labels;
        currentUser.businesses = [newBusinessAccount._id];
        currentUser.hashedRt = hashedRefreshToken;
        currentUser.lastSignInAt = new Date();
        const [newUserDoc, newBusinessAccDoc] = await Promise.all([currentUser.save(), newBusinessAccount.save()]);
        newUserDoc.password = null;
        return {
            auth: tokens,
            attributes: {
                currentBusinessAccounts: [newBusinessAccDoc],
                currentUser: newUserDoc,
            },
        };
    }
};
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(business_user_entity_1.BusinessUser.name)),
    tslib_1.__param(1, (0, mongoose_1.InjectModel)(business_entity_1.Business.name)),
    tslib_1.__param(2, (0, mongoose_1.InjectModel)(service_entity_1.Service.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object, typeof (_d = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _d : Object, typeof (_e = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _e : Object])
], AuthService);


/***/ }),
/* 48 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { getObjectId } = __webpack_require__(49);
const categories = __webpack_require__(50);
const defaultCategory = categories.find(category => category.short_id === "1020");
const defaultServiceColors = {
    red: {
        colorId: 1,
        colorName: "red",
        hexCode: "#e07a5f",
        isSelected: null,
        isDefault: true,
    },
    blue: {
        colorId: 2,
        colorName: "blue",
        hexCode: "#0c41ff",
        isSelected: null,
        isDefault: false,
    },
    green: {
        colorId: 3,
        colorName: "green",
        hexCode: "#7ac590",
        isSelected: null,
        isDefault: false,
    },
    yellow: {
        colorId: 4,
        colorName: "yellow",
        hexCode: "#f2cc8f",
        isSelected: null,
        isDefault: false,
    },
    lightBlue: {
        colorId: 5,
        colorName: "lightBlue",
        hexCode: "#4ceaff",
        isSelected: null,
        isDefault: false,
    },
    purple: {
        colorId: 6,
        colorName: "purple",
        hexCode: "#766fff",
        isSelected: null,
        isDefault: false,
    },
};
const defaultBusinessHours = {
    mon: [
        {
            startTime: 540,
            endTime: 1020,
            isActive: true,
        },
    ],
    tue: [
        {
            startTime: 540,
            endTime: 1020,
            isActive: true,
        },
    ],
    wed: [
        {
            startTime: 540,
            endTime: 1020,
            isActive: true,
        },
    ],
    thu: [
        {
            startTime: 540,
            endTime: 1020,
            isActive: true,
        },
    ],
    fri: [
        {
            startTime: 540,
            endTime: 1020,
            isActive: true,
        },
    ],
    sat: [
        {
            startTime: 540,
            endTime: 1020,
            isActive: true,
        },
    ],
    sun: [
        {
            startTime: 540,
            endTime: 1020,
            isActive: true,
        },
    ],
};
const shortwaitsAdminDefaultData = [
    {
        _id: getObjectId("0000001"),
        short_id: "0000001",
        name: "Shortwaits LLC",
        banners: [
            {
                id: "0001",
                short_id: "0001",
                name: "Upgrade to Shortwaits Premium",
            },
        ],
        description: "Shortwaits Default data for the USA area only",
        links: [""],
        suggestedLang: "en",
        blackList: [],
        timeZones: ["ET"],
        categories: [defaultCategory._id],
        serviceColors: defaultServiceColors,
        sampleBusinessData: {
            services: [
                {
                    name: "Service I - 15 mins",
                    applicableCategories: [
                        categories[0]._id,
                        categories[1]._id,
                        categories[2]._id,
                    ],
                    hours: defaultBusinessHours,
                    description: "Describe your service here =)",
                    durationInMin: 15,
                    price: 1500,
                    businessId: null,
                    createdBy: null,
                    updatedBy: null,
                    currency: "USD",
                    isPrivate: false,
                    urls: null,
                    isVideoConference: false,
                    deleted: false,
                    serviceColor: defaultServiceColors["red"],
                    imageUrl: "",
                },
                {
                    name: "Service II - 1 hr",
                    applicableCategories: [
                        categories[0]._id,
                        categories[1]._id,
                        categories[2]._id,
                    ],
                    hours: defaultBusinessHours,
                    description: "Describe your service here =)",
                    durationInMin: 60,
                    price: 2000,
                    businessId: null,
                    createdBy: null,
                    updatedBy: null,
                    currency: "USD",
                    isPrivate: false,
                    urls: null,
                    isVideoConference: false,
                    deleted: false,
                    serviceColor: defaultServiceColors["blue"],
                    imageUrl: "",
                },
                {
                    name: "Service III - 3 hrs",
                    hours: defaultBusinessHours,
                    applicableCategories: [
                        categories[0]._id,
                        categories[1]._id,
                        categories[2]._id,
                    ],
                    description: "Describe your service here =)",
                    durationInMin: 180,
                    price: 2500,
                    businessId: null,
                    createdBy: null,
                    updatedBy: null,
                    currency: "USD",
                    isPrivate: false,
                    urls: null,
                    isVideoConference: false,
                    deleted: false,
                    serviceColor: defaultServiceColors["green"],
                    imageUrl: "",
                },
            ],
            currencies: [
                {
                    name: "United States dollar",
                    decimalSeparator: 2,
                    symbol: "US$",
                    code: "USD",
                    codeNumber: 840,
                },
                {
                    name: "Peruvian sol",
                    symbol: "S/",
                    decimalSeparator: 2,
                    code: "PEN",
                    codeNumber: 640,
                },
            ],
            hours: defaultBusinessHours,
            labels: [
                {
                    name: "MVP",
                    description: "MVP clients only",
                    isFavorite: false,
                    emojiShortName: "trophy",
                },
                {
                    name: "Disability",
                    description: "Event will will require wheelchair access",
                    isFavorite: false,
                    emojiShortName: "wheelchair",
                },
                {
                    name: "Family friendly",
                    description: "This is a family friendly event",
                    isFavorite: false,
                    emojiShortName: "man-man-girl-girl",
                },
            ],
        },
    },
];
module.exports = shortwaitsAdminDefaultData;


/***/ }),
/* 49 */
/***/ ((module) => {

"use strict";
module.exports = require("mongo-seeding");

/***/ }),
/* 50 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { getObjectId } = __webpack_require__(49);
const categories = [
    {
        _id: getObjectId("1007"),
        short_id: "1007",
        name: "Beauty Services",
        keys: ["beauty"],
        translations: [
            {
                languageCode: "es",
                translation: "Servicios de educacion",
                languageName: "spanish",
            },
        ],
        isDefault: true,
        state: 1,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1008"),
        short_id: "1008",
        name: "Education Services",
        keys: ["education"],
        translations: [
            {
                languageCode: "es",
                translation: "Salud y bienestar",
                languageName: "spanish",
            },
        ],
        isDefault: false,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1018"),
        short_id: "1018",
        name: "Animal Care",
        keys: ["dog", "cat", "veterinarian"],
        translations: [
            {
                languageCode: "es",
                translation: "Servicios para mascotas",
                languageName: "spanish",
            },
        ],
        isDefault: false,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1010"),
        short_id: "1010",
        name: "Food Product",
        keys: ["food"],
        translations: [
            {
                languageCode: "es",
                translation: "Restaurantes y vida nocturna",
                languageName: "spanish",
            },
        ],
        isDefault: false,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1000"),
        short_id: "1000",
        name: "Accounting & Tax Services",
        keys: ["accounting", "tax"],
        translations: [
            {
                languageCode: "es",
                translation: "Servicios de contabilidad e impuestos",
                languageName: "spanish",
            },
        ],
        isDefault: true,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1001"),
        short_id: "1001",
        name: "Arts, Culture & Entertainment",
        keys: ["art", "culture", "entertainment"],
        translations: [
            {
                languageCode: "es",
                translation: "Arte, cultura y entretenimiento",
                languageName: "spanish",
            },
        ],
        isDefault: true,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1017"),
        short_id: "1017",
        name: "Health & Wellness",
        keys: ["health", "wellness", "covid"],
        translations: [
            {
                languageCode: "es",
                translation: "Servicios de salud",
                languageName: "spanish",
            },
        ],
        isDefault: false,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1020"),
        short_id: "1020",
        name: "Other",
        keys: [],
        translations: [
            {
                languageCode: "es",
                translation: "Compras y venta al por menor",
                languageName: "spanish",
            },
        ],
        isDefault: false,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1024"),
        short_id: "1024",
        name: "Restaurants & Nightlife",
        keys: ["drinks", "alcohol", "food"],
        translations: [
            {
                languageCode: "es",
                translation: "Bodas, Eventos y Reuniones",
                languageName: "spanish",
            },
        ],
        isDefault: false,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1022"),
        short_id: "1022",
        name: "Pet Services",
        keys: ["dog", "cat", "pet"],
        translations: [
            {
                languageCode: "es",
                translation: "Servicios de transporte",
                languageName: "spanish",
            },
        ],
        isDefault: false,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1021"),
        short_id: "1021",
        name: "Transportation Services",
        keys: ["taxi", "bus", "car"],
        translations: [
            {
                languageCode: "es",
                translation: "Servicios de belleza",
                languageName: "spanish",
            },
        ],
        isDefault: false,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1026"),
        short_id: "1026",
        name: "Vehicle service and accessories.",
        keys: ["mechanic", "car", "shop", "fix"],
        translations: [
            {
                languageCode: "es",
                translation: "Otro",
                languageName: "spanish",
            },
        ],
        isDefault: false,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1027"),
        short_id: "1027",
        name: "Wedding, Events & Meetings",
        keys: ["party", "bridal", "weeding", "ring"],
        translations: [
            {
                languageCode: "es",
                translation: "Producto alimenticio",
                languageName: "spanish",
            },
        ],
        isDefault: false,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1023"),
        short_id: "1023",
        name: "Shopping & Retail",
        keys: ["store", "shop"],
        translations: [
            {
                languageCode: "es",
                translation: "Servicio de vehículos y accesorios.",
                languageName: "spanish",
            },
        ],
        isDefault: false,
        state: 0,
        deleted: false,
        description: "",
    },
    {
        _id: getObjectId("1019"),
        short_id: "1019",
        name: "Home Improvement",
        keys: ["home", "construction", "renovation", "improvement"],
        translations: [
            {
                languageCode: "es",
                translation: "Mejoras para el hogar",
                languageName: "spanish",
            },
        ],
        isDefault: false,
        state: 0,
        deleted: false,
        description: "",
    },
];
module.exports = categories;


/***/ }),
/* 51 */
/***/ ((module) => {

"use strict";
module.exports = require("bcryptjs");

/***/ }),
/* 52 */
/***/ ((module) => {

"use strict";
module.exports = require("nanoid");

/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertDomainToLowercase = exports.validateId = exports.convertStringToObjectId = exports.convertArrayToObjectId = void 0;
const mongoose_1 = __webpack_require__(17);
function convertArrayToObjectId(ids) {
    return ids.map(id => new mongoose_1.Types.ObjectId(id));
}
exports.convertArrayToObjectId = convertArrayToObjectId;
function convertStringToObjectId(id) {
    return new mongoose_1.Types.ObjectId(id);
}
exports.convertStringToObjectId = convertStringToObjectId;
function validateId(id) {
    return mongoose_1.Types.ObjectId.isValid(id);
}
exports.validateId = validateId;
function convertDomainToLowercase(email) {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
        const localPart = email.slice(0, atIndex);
        const domainPart = email.slice(atIndex + 1);
        const lowercaseDomain = domainPart.toLowerCase();
        return `${localPart}@${lowercaseDomain}`;
    }
    return email;
}
exports.convertDomainToLowercase = convertDomainToLowercase;


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNewUserFromSocialAccount = exports.getFilteredNewBusinessOwner = exports.getFilteredNewEvent = exports.getFilteredBusinessUser = exports.getFilteredClientUser = void 0;
const getFilteredClientUser = (createCustomerDto) => {
    const filteredClientUser = {
        clientType: createCustomerDto?.clientType,
        username: createCustomerDto?.username,
        alias: createCustomerDto?.alias,
        displayName: createCustomerDto?.displayName,
        familyName: createCustomerDto?.familyName,
        givenName: createCustomerDto?.givenName,
        middleName: createCustomerDto?.middleName,
        accountImageUrl: createCustomerDto?.accountImageUrl,
        email: createCustomerDto?.email,
        password: createCustomerDto?.password,
        locale: createCustomerDto?.locale,
        phoneNumbers: createCustomerDto?.phoneNumbers,
        imAddresses: createCustomerDto?.imAddresses,
        addresses: createCustomerDto?.addresses,
        socialAccounts: createCustomerDto?.socialAccounts,
        desiredCurrencies: createCustomerDto?.desiredCurrencies,
    };
    return filteredClientUser;
};
exports.getFilteredClientUser = getFilteredClientUser;
const getFilteredBusinessUser = (createCustomerDto) => {
    const filteredBusinessUser = {
        username: createCustomerDto?.username,
        preferredAlias: createCustomerDto?.preferredAlias,
        displayName: createCustomerDto?.displayName,
        familyName: createCustomerDto?.familyName,
        givenName: createCustomerDto?.givenName,
        middleName: createCustomerDto?.middleName,
        accountImageUrl: createCustomerDto?.accountImageUrl,
        email: createCustomerDto?.email,
        password: createCustomerDto?.password,
        locale: createCustomerDto?.locale,
        phoneNumbers: createCustomerDto?.phoneNumbers,
        imAddresses: createCustomerDto?.imAddresses,
        addresses: createCustomerDto?.addresses,
        socialAccounts: createCustomerDto?.socialAccounts,
        desiredCurrencies: createCustomerDto?.desiredCurrencies,
    };
    return filteredBusinessUser;
};
exports.getFilteredBusinessUser = getFilteredBusinessUser;
const getFilteredNewEvent = (event, userId) => {
    const filteredEvent = {
        createdBy: userId,
        updatedBy: userId,
        priceFinal: event.priceExpected,
        deleted: false,
        canceled: false,
        isPublicEvent: true,
        status: {
            statusCode: 0,
            statusName: "PENDING",
        },
        cancellationReason: "",
        paymentMethod: event.paymentMethod ?? "CASH",
        participantsIds: event.participantsIds,
        staffIds: event.staffIds,
        clientsIds: event.clientsIds,
        businessId: event.businessId,
        leadClientId: event.leadClientId,
        name: event.name,
        description: event.description,
        eventImage: event.eventImage,
        serviceId: event.serviceId,
        features: event.features,
        hasNoDuration: event.hasNoDuration,
        durationInMin: event.durationInMin,
        startTime: event.startTime,
        endTime: event.endTime,
        expectedEndTime: event.expectedEndTime,
        priceExpected: event.priceExpected,
        repeat: event.repeat,
        payment: event.payment,
        notes: event.notes,
        labels: event.labels,
        urls: event.urls,
        location: event.location,
        attendeeLimit: event.attendeeLimit,
        registrationDeadlineTime: event.registrationDeadlineTime,
        registrationFee: event.registrationFee,
    };
    return filteredEvent;
};
exports.getFilteredNewEvent = getFilteredNewEvent;
const getFilteredNewBusinessOwner = (ownerSignupDto) => {
    const filteredBusinessUser = {
        preferredAlias: "username",
        displayName: null,
        familyName: null,
        givenName: null,
        middleName: null,
        accountImageUrl: null,
        locale: null,
        phoneNumbers: null,
        imAddresses: null,
        addresses: null,
        socialAccounts: null,
        desiredCurrencies: null,
        primaryPhoneNumberLabel: null,
        birthday: null,
        hours: null,
        // require
        username: ownerSignupDto?.username,
        email: ownerSignupDto?.email,
        isEmailVerified: false,
        password: ownerSignupDto?.password,
        isPasswordProtected: true,
        isDisabled: false,
        isStaff: false,
        createdByBusinessId: null,
        deleted: false,
        roleId: null,
        registrationState: {
            screenName: null,
            state: 0,
            isCompleted: false,
        },
        // below will get overridden by the Auth service
        businesses: null,
        hashedRt: null,
        lastSignInAt: null,
        // `createdAt` and `updatedAt` will get overridden by the Mongoose schema
        createdAt: null,
        updatedAt: null,
    };
    return filteredBusinessUser;
};
exports.getFilteredNewBusinessOwner = getFilteredNewBusinessOwner;
const getNewUserFromSocialAccount = (ownerSignupDto) => {
    const filteredBusinessUser = {
        preferredAlias: "username",
        displayName: null,
        familyName: null,
        givenName: null,
        middleName: null,
        accountImageUrl: null,
        locale: null,
        phoneNumbers: null,
        imAddresses: null,
        addresses: null,
        socialAccounts: null,
        desiredCurrencies: null,
        primaryPhoneNumberLabel: null,
        birthday: null,
        hours: null,
        // require
        username: ownerSignupDto?.email,
        email: ownerSignupDto?.email,
        isEmailVerified: true,
        password: ownerSignupDto?.password,
        isPasswordProtected: true,
        isDisabled: false,
        isStaff: false,
        createdByBusinessId: null,
        deleted: false,
        roleId: null,
        registrationState: {
            screenName: null,
            state: 0,
            isCompleted: false,
        },
        // below will get overridden by the Auth service
        businesses: null,
        hashedRt: null,
        lastSignInAt: null,
        // `createdAt` and `updatedAt` will get overridden by the Mongoose schema
        createdAt: null,
        updatedAt: null,
    };
    return filteredBusinessUser;
};
exports.getNewUserFromSocialAccount = getNewUserFromSocialAccount;


/***/ }),
/* 55 */
/***/ ((module) => {

"use strict";
module.exports = require("google-auth-library");

/***/ }),
/* 56 */
/***/ ((module) => {

"use strict";
module.exports = require("rxjs");

/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateClientUsers = exports.generateClientUser = exports.generateBusinessUsers = exports.generateBusinessUser = void 0;
const shared_lib_1 = __webpack_require__(18);
const generateBusinessUser = (user) => {
    let accountImageUrl = "";
    if (user.accountImageUrl === "" || user.accountImageUrl === null || user.accountImageUrl === undefined) {
        const stringIdentifier = user.familyName || user.givenName || user.middleName || user.username || user.email || user.displayName || "?";
        accountImageUrl = (0, shared_lib_1.generateAvatarUrl)(stringIdentifier);
    }
    else {
        accountImageUrl = user.accountImageUrl;
    }
    return {
        ...user,
        accountImageUrl,
        roleId: null,
        deleted: false,
        isDisabled: false,
    };
};
exports.generateBusinessUser = generateBusinessUser;
const generateBusinessUsers = (users) => {
    const businessUsers = users.map(user => {
        return (0, exports.generateBusinessUser)(user);
    });
    return businessUsers;
};
exports.generateBusinessUsers = generateBusinessUsers;
const generateClientUser = (user) => {
    let accountImageUrl = "";
    if (user.accountImageUrl === "" || user.accountImageUrl === null || user.accountImageUrl === undefined) {
        const stringIdentifier = user.familyName || user.givenName || user.middleName || user.username || user.email || user.displayName || "?";
        accountImageUrl = (0, shared_lib_1.generateAvatarUrl)(stringIdentifier);
    }
    else {
        accountImageUrl = user.accountImageUrl;
    }
    return {
        ...user,
        accountImageUrl,
        roleId: null,
        deleted: false,
        isDisabled: false,
    };
};
exports.generateClientUser = generateClientUser;
const generateClientUsers = (users) => {
    const clientUsers = users.map(user => {
        return (0, exports.generateClientUser)(user);
    });
    return clientUsers;
};
exports.generateClientUsers = generateClientUsers;


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignUpWithEmailDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
const class_sanitizer_1 = __webpack_require__(59);
const class_validator_1 = __webpack_require__(60);
class SignUpWithEmailDto {
}
exports.SignUpWithEmailDto = SignUpWithEmailDto;
tslib_1.__decorate([
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(320),
    (0, swagger_1.ApiProperty)({ example: "sw123" }),
    tslib_1.__metadata("design:type", String)
], SignUpWithEmailDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(320),
    (0, swagger_1.ApiProperty)({ example: "sw@sw.com" }),
    tslib_1.__metadata("design:type", String)
], SignUpWithEmailDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: "Shortwaits123" }),
    tslib_1.__metadata("design:type", String)
], SignUpWithEmailDto.prototype, "password", void 0);


/***/ }),
/* 59 */
/***/ ((module) => {

"use strict";
module.exports = require("class-sanitizer");

/***/ }),
/* 60 */
/***/ ((module) => {

"use strict";
module.exports = require("class-validator");

/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignInWithEmailDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
const class_sanitizer_1 = __webpack_require__(59);
const class_validator_1 = __webpack_require__(60);
class SignInWithEmailDto {
}
exports.SignInWithEmailDto = SignInWithEmailDto;
tslib_1.__decorate([
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(320),
    (0, swagger_1.ApiProperty)({ example: "sw123" }),
    tslib_1.__metadata("design:type", String)
], SignInWithEmailDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(320),
    (0, swagger_1.ApiProperty)({ example: "sw@sw.com" }),
    tslib_1.__metadata("design:type", String)
], SignInWithEmailDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    (0, swagger_1.ApiProperty)({ example: "Shortwaits123" }),
    tslib_1.__metadata("design:type", String)
], SignInWithEmailDto.prototype, "password", void 0);


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WithSocialAuthDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
const class_sanitizer_1 = __webpack_require__(59);
const class_validator_1 = __webpack_require__(60);
class WithSocialAuthDto {
}
exports.WithSocialAuthDto = WithSocialAuthDto;
tslib_1.__decorate([
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(320),
    (0, swagger_1.ApiProperty)({ example: "google" }),
    tslib_1.__metadata("design:type", String)
], WithSocialAuthDto.prototype, "provider", void 0);
tslib_1.__decorate([
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(400),
    (0, swagger_1.ApiProperty)({ example: "" }),
    tslib_1.__metadata("design:type", String)
], WithSocialAuthDto.prototype, "authCode", void 0);


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetCurrentBusinessId = exports.GetCurrentUser = exports.GetCurrentUserId = exports.Public = void 0;
const common_1 = __webpack_require__(9);
const common_2 = __webpack_require__(9);
const Public = () => (0, common_2.SetMetadata)('isPublic', true);
exports.Public = Public;
exports.GetCurrentUserId = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.sub;
});
exports.GetCurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    if (!data)
        return request.user;
    return request.user[data];
});
exports.GetCurrentBusinessId = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.params;
    return user.sub;
});


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(65), exports);
tslib_1.__exportStar(__webpack_require__(67), exports);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AtGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const core_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(66);
let AtGuard = exports.AtGuard = class AtGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        return super.canActivate(context);
    }
};
exports.AtGuard = AtGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], AtGuard);


/***/ }),
/* 66 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/passport");

/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RtGuard = void 0;
const passport_1 = __webpack_require__(66);
class RtGuard extends (0, passport_1.AuthGuard)('jwt-refresh') {
    constructor() {
        super();
    }
}
exports.RtGuard = RtGuard;


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRefreshSuccessResponse = exports.AuthSuccessResponse = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
class AuthSuccessResponse {
}
exports.AuthSuccessResponse = AuthSuccessResponse;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Object)
], AuthSuccessResponse.prototype, "auth", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Object)
], AuthSuccessResponse.prototype, "attributes", void 0);
class AuthRefreshSuccessResponse {
}
exports.AuthRefreshSuccessResponse = AuthRefreshSuccessResponse;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Object)
], AuthRefreshSuccessResponse.prototype, "auth", void 0);


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AtStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const config_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(10);
const passport_1 = __webpack_require__(66);
const passport_jwt_1 = __webpack_require__(70);
const mongoose_2 = __webpack_require__(17);
const business_user_entity_1 = __webpack_require__(16);
let AtStrategy = exports.AtStrategy = class AtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "jwt") {
    constructor(businessUserModal, config) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("AT_SECRET"),
        });
        this.businessUserModal = businessUserModal;
    }
    validate(payload) {
        console.log("validate/payload >>>", payload);
        // const user = await this.businessUserModal.findById(payload.sub);
        // delete user.password;
        // return user;
        return payload;
    }
};
exports.AtStrategy = AtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(business_user_entity_1.BusinessUser.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], AtStrategy);


/***/ }),
/* 70 */
/***/ ((module) => {

"use strict";
module.exports = require("passport-jwt");

/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RtStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(66);
const passport_jwt_1 = __webpack_require__(70);
const common_1 = __webpack_require__(9);
const config_1 = __webpack_require__(3);
let RtStrategy = exports.RtStrategy = class RtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor(config) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('RT_SECRET'),
            passReqToCallback: true,
        });
    }
    validate(req, payload) {
        const refreshToken = req
            ?.get('authorization')
            ?.replace('Bearer', '')
            .trim();
        if (!refreshToken)
            throw new common_1.ForbiddenException('Refresh token malformed');
        return {
            ...payload,
            refreshToken,
        };
    }
};
exports.RtStrategy = RtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], RtStrategy);


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const mongoose_1 = __webpack_require__(10);
const business_controller_1 = __webpack_require__(73);
const business_service_1 = __webpack_require__(74);
const service_entity_1 = __webpack_require__(45);
const business_entity_1 = __webpack_require__(44);
const business_user_entity_1 = __webpack_require__(16);
const client_user_entity_1 = __webpack_require__(75);
let BusinessModule = exports.BusinessModule = class BusinessModule {
};
exports.BusinessModule = BusinessModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: business_entity_1.Business.name, schema: business_entity_1.BusinessSchema },
                { name: service_entity_1.Service.name, schema: service_entity_1.ServiceSchema },
                { name: business_user_entity_1.BusinessUser.name, schema: business_user_entity_1.BusinessUserSchema },
                { name: client_user_entity_1.ClientUser.name, schema: client_user_entity_1.ClientUserSchema },
            ]),
        ],
        controllers: [business_controller_1.BusinessController],
        providers: [business_service_1.BusinessService],
    })
], BusinessModule);


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const swagger_1 = __webpack_require__(5);
const shared_lib_1 = __webpack_require__(18);
const business_service_1 = __webpack_require__(74);
const guards_1 = __webpack_require__(64);
const updateBusiness_dto_1 = __webpack_require__(76);
const registerBusiness_dto_1 = __webpack_require__(77);
let BusinessController = exports.BusinessController = class BusinessController {
    constructor(businessService) {
        this.businessService = businessService;
    }
    async updateBusiness(businessId, request, business) {
        return this.businessService.updateBusiness(request.user.sub, business, false);
    }
    /**
     * Only admins of the business can retrieve full information
     */
    async getBusiness(businessId, request) {
        return this.businessService.getBusiness(businessId, request.user.sub);
    }
    async getBusinessAdmins(businessId) {
        return this.businessService.findByKey(businessId, "admins");
    }
    async getBusinessServices(businessId) {
        return this.businessService.findByKey(businessId, "services");
    }
    async getBusinessCategories(businessId) {
        return this.businessService.findByKey(businessId, "categories");
    }
    async getBusinessHours(businessId) {
        return this.businessService.findByKey(businessId, "hours");
    }
    async getBusinessEvents(businessId) {
        return this.businessService.findByKey(businessId, "events");
    }
    async getBusinessClients(businessId, request) {
        return this.businessService.getUsers("client", businessId, request.user.sub);
    }
    async createBusinessClients(businessId, request, dto) {
        return this.businessService.createBusinessClients(request.user.sub, businessId, dto);
    }
    async updateBusinessClient(businessId, request, dto) {
        return this.businessService.updateBusinessClient(request.user.sub, businessId, dto);
    }
    async getBusinessStaffByIds(businessId, request) {
        return this.businessService.getUsers("staff", businessId, request.user.sub);
    }
    async createBusinessStaff(businessId, request, dto) {
        return this.businessService.createBusinessStaff(request.user.sub, businessId, dto);
    }
    async updateBusinessStaff(businessId, request, dto) {
        return this.businessService.updateBusinessStaff(request.user.sub, businessId, dto);
    }
    async registerBusiness(request, business) {
        return this.businessService.registerBusiness(request.user.sub, business);
    }
};
tslib_1.__decorate([
    (0, common_1.Put)(":businessId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Updates business record",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Body)(new common_1.ValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, typeof (_b = typeof updateBusiness_dto_1.UpdateBusinessDto !== "undefined" && updateBusiness_dto_1.UpdateBusinessDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "updateBusiness", null);
tslib_1.__decorate([
    (0, common_1.Get)(":businessId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns business record",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "getBusiness", null);
tslib_1.__decorate([
    (0, common_1.Get)(":businessId/admins"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns business admins",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "getBusinessAdmins", null);
tslib_1.__decorate([
    (0, common_1.Get)(":businessId/services"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns business services",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "getBusinessServices", null);
tslib_1.__decorate([
    (0, common_1.Get)(":businessId/categories"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns business categories",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "getBusinessCategories", null);
tslib_1.__decorate([
    (0, common_1.Get)(":businessId/hours"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns business hours",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "getBusinessHours", null);
tslib_1.__decorate([
    (0, common_1.Get)(":businessId/events"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns business events",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "getBusinessEvents", null);
tslib_1.__decorate([
    (0, common_1.Get)(":businessId/clients"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns business clients",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "getBusinessClients", null);
tslib_1.__decorate([
    (0, common_1.Post)(":businessId/clients"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Returns created",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, typeof (_c = typeof shared_lib_1.CreateClientUsersDtoType !== "undefined" && shared_lib_1.CreateClientUsersDtoType) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "createBusinessClients", null);
tslib_1.__decorate([
    (0, common_1.Put)(":businessId/client"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Returns created",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, typeof (_d = typeof shared_lib_1.ClientUserUpdateDtoType !== "undefined" && shared_lib_1.ClientUserUpdateDtoType) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "updateBusinessClient", null);
tslib_1.__decorate([
    (0, common_1.Get)(":businessId/staff"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns business staff",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "getBusinessStaffByIds", null);
tslib_1.__decorate([
    (0, common_1.Post)(":businessId/staff"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns business staff",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, typeof (_e = typeof shared_lib_1.CreateBusinessUsersDtoType !== "undefined" && shared_lib_1.CreateBusinessUsersDtoType) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "createBusinessStaff", null);
tslib_1.__decorate([
    (0, common_1.Put)(":businessId/staff"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Returns created",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, typeof (_f = typeof shared_lib_1.ClientUserUpdateDtoType !== "undefined" && shared_lib_1.ClientUserUpdateDtoType) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "updateBusinessStaff", null);
tslib_1.__decorate([
    (0, common_1.Put)("registration/complete"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Register Business",
    }),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_g = typeof registerBusiness_dto_1.RegisterBusinessDto !== "undefined" && registerBusiness_dto_1.RegisterBusinessDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessController.prototype, "registerBusiness", null);
exports.BusinessController = BusinessController = tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, swagger_1.ApiTags)("business"),
    (0, swagger_1.ApiBearerAuth)("bearer"),
    (0, common_1.Controller)("business"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof business_service_1.BusinessService !== "undefined" && business_service_1.BusinessService) === "function" ? _a : Object])
], BusinessController);


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessService = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(17);
const mongoose_2 = __webpack_require__(10);
const common_1 = __webpack_require__(9);
const business_entity_1 = __webpack_require__(44);
const business_user_entity_1 = __webpack_require__(16);
const client_user_entity_1 = __webpack_require__(75);
const converters_1 = __webpack_require__(53);
const generateUserPayload_1 = __webpack_require__(57);
let BusinessService = exports.BusinessService = class BusinessService {
    constructor(businessModel, businessUserModel, clientUserModel) {
        this.businessModel = businessModel;
        this.businessUserModel = businessUserModel;
        this.clientUserModel = clientUserModel;
    }
    isUserAdminType(business, userId) {
        const id = (0, converters_1.convertStringToObjectId)(userId);
        const isAdmin = business.admins.includes(id);
        const isSuperAdmin = business.superAdmins.includes(id);
        if (isAdmin || isSuperAdmin) {
            return { isAdmin, isSuperAdmin };
        }
        else {
            throw new common_1.ForbiddenException("Not enough permissions");
        }
    }
    filterBusiness(business) {
        delete business.admins;
        delete business.backgroundAdmins;
        delete business.superAdmins;
        delete business.deleted;
        delete business.isRegistrationCompleted;
        delete business.createdBy;
        return business;
    }
    async findBusinessById(businessId) {
        const businessData = await this.businessModel.findById(businessId).exec();
        if (businessData) {
            return businessData;
        }
        else {
            throw new common_1.NotFoundException("Business not available");
        }
    }
    /**
     *
     * we need to verify that user is an admin for the requested business
     *
     */
    async getBusiness(businessId, userId) {
        const businessData = await this.findBusinessById(businessId);
        const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, userId);
        if (isAdmin || isSuperAdmin) {
            return businessData;
        }
    }
    async updateBusiness(userId, business, isRegistrationCompleted) {
        const filteredBusiness = {
            ...this.filterBusiness(business),
            isRegistrationCompleted: isRegistrationCompleted ? true : undefined,
        }; // we need prevent certain fields from being updated by the user [security]
        console.log("isRegistrationCompleted", isRegistrationCompleted);
        const updatedBusiness = await this.businessModel.findByIdAndUpdate(filteredBusiness._id, filteredBusiness, {
            new: true,
        });
        if (!updatedBusiness) {
            throw new common_1.NotFoundException("Business not available");
        }
        const { isAdmin, isSuperAdmin } = this.isUserAdminType(updatedBusiness, userId);
        if (isAdmin || isSuperAdmin) {
            return await updatedBusiness.save();
        }
        else {
            throw new common_1.ForbiddenException("Not enough permissions");
        }
    }
    async registerBusiness(userId, business) {
        console.log("registerBusiness ****");
        const isRegistrationCompleted = true;
        if (business.services.length === 0) {
            throw new common_1.PreconditionFailedException({
                error: "Precondition Failed",
                message: "Unable to register business\n missing: services.",
                statusCode: 412,
            });
        }
        if (business.categories.length === 0) {
            throw new common_1.PreconditionFailedException({
                error: "Precondition Failed",
                message: "Unable to register business\n missing: categories.",
                statusCode: 412,
            });
        }
        const updatedBusiness = this.updateBusiness(userId, business, isRegistrationCompleted);
        return updatedBusiness;
    }
    async updateBusinessHours(businessId, userId, dto) {
        const businessData = await this.businessModel.findOne({ _id: businessId }, null, { new: true });
        const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, userId);
        if (isAdmin || isSuperAdmin) {
            businessData.hours = dto.hours;
            console.log({ ...dto });
            return await businessData.save();
        }
    }
    async findByKey(businessId, key) {
        const data = await this.businessModel.findById(businessId, String(key)).exec();
        data;
        if (data) {
            return data[key];
        }
        else {
            throw new common_1.ForbiddenException("No data available");
        }
    }
    async getUsers(userType, businessId, userId) {
        const businessData = await this.findBusinessById(businessId);
        const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, userId);
        if (isAdmin || isSuperAdmin) {
            if (userType === "staff") {
                const staff = await this.businessUserModel
                    .find({
                    _id: {
                        $in: businessData.staff,
                    },
                })
                    .select("-__v -hashedRt");
                return staff;
            }
            else if (userType === "client") {
                const clients = await this.clientUserModel
                    .find({
                    _id: {
                        $in: businessData.clients,
                    },
                })
                    .select("-__v -hashedRt");
                return clients;
            }
        }
    }
    async createBusinessStaff(businessUserId, businessId, staff) {
        const businessData = await this.findBusinessById(businessId);
        const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);
        if (isAdmin || isSuperAdmin) {
            const staffPayload = (0, generateUserPayload_1.generateBusinessUsers)(staff);
            const insertedStaff = await this.businessUserModel.insertMany(staffPayload);
            const staffIds = insertedStaff.map(client => {
                return client._id;
            });
            await this.businessModel.findByIdAndUpdate(businessId, {
                $push: { staff: staffIds },
            });
            const newStaff = await this.businessUserModel.find({
                businesses: {
                    $in: [businessId],
                },
            });
            return newStaff;
        }
    }
    async createBusinessClients(businessUserId, businessId, clients) {
        const businessData = await this.findBusinessById(businessId);
        const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);
        if (isAdmin || isSuperAdmin) {
            const clientsPayload = (0, generateUserPayload_1.generateClientUsers)(clients);
            const insertedClients = await this.clientUserModel.insertMany(clientsPayload);
            const clientsIds = insertedClients.map(client => {
                return client._id;
            });
            const businessClients = businessData.clients ? businessData.clients.concat(clientsIds) : clientsIds;
            const business = await this.businessModel.findByIdAndUpdate(businessId, {
                clients: businessClients,
            }, { new: true });
            const updatedBusiness = await business.save();
            const newClients = await this.clientUserModel.find({
                _id: {
                    $in: updatedBusiness.clients,
                },
            });
            return newClients;
        }
    }
    async updateBusinessClient(businessUserId, businessId, client) {
        const businessData = await this.findBusinessById(businessId);
        const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);
        const clientId = (0, converters_1.convertStringToObjectId)(client._id);
        const isClient = businessData.clients.includes(clientId);
        if (!isClient) {
            throw new common_1.ForbiddenException("Unrecognized client");
        }
        if (isAdmin || isSuperAdmin) {
            const updatedClient = await this.clientUserModel.findOneAndUpdate({ _id: client._id }, client, {
                new: true,
            });
            return updatedClient;
        }
    }
    async updateBusinessStaff(businessUserId, businessId, staff) {
        const businessData = await this.findBusinessById(businessId);
        const { isAdmin, isSuperAdmin } = this.isUserAdminType(businessData, businessUserId);
        const staffId = (0, converters_1.convertStringToObjectId)(staff._id);
        const isStaff = businessData.staff.includes(staffId);
        if (!isStaff) {
            throw new common_1.ForbiddenException("Unrecognized staff");
        }
        if (isAdmin || isSuperAdmin) {
            const updatedClient = await this.businessUserModel.findOneAndUpdate({ _id: staff._id }, staff, {
                new: true,
            });
            return updatedClient;
        }
    }
};
exports.BusinessService = BusinessService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(business_entity_1.Business.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(business_user_entity_1.BusinessUser.name)),
    tslib_1.__param(2, (0, mongoose_2.InjectModel)(client_user_entity_1.ClientUser.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _c : Object])
], BusinessService);


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientUserSchema = exports.ClientUser = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(17);
const shared_lib_1 = __webpack_require__(18);
let ClientUser = exports.ClientUser = class ClientUser extends mongoose_2.Document {
};
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        type: mongoose_2.Schema.Types.ObjectId,
    })),
    tslib_1.__metadata("design:type", typeof (_a = typeof shared_lib_1.ObjectId !== "undefined" && shared_lib_1.ObjectId) === "function" ? _a : Object)
], ClientUser.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], ClientUser.prototype, "businesses", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ClientUser.prototype, "doe", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "username", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({
        default: "displayName",
    }),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "alias", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "displayName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "familyName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "givenName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "middleName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "accountImageUrl", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], ClientUser.prototype, "phoneNumbers", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], ClientUser.prototype, "imAddresses", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        type: Array,
    })),
    tslib_1.__metadata("design:type", Array)
], ClientUser.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        type: Array,
    })),
    tslib_1.__metadata("design:type", Array)
], ClientUser.prototype, "socialAccounts", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        type: mongoose_2.Schema.Types.Mixed,
    })),
    tslib_1.__metadata("design:type", Object)
], ClientUser.prototype, "registrationState", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "password", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], ClientUser.prototype, "desiredCurrencies", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        type: mongoose_2.Schema.Types.Mixed,
    })),
    tslib_1.__metadata("design:type", Object)
], ClientUser.prototype, "locale", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], ClientUser.prototype, "deleted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ClientUser.prototype, "lastSignInAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "hashedRt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ClientUser.prototype, "clientType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        type: mongoose_2.Schema.Types.Mixed,
    })),
    tslib_1.__metadata("design:type", Object)
], ClientUser.prototype, "registration", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        type: mongoose_2.Schema.Types.Mixed,
    })),
    tslib_1.__metadata("design:type", Object)
], ClientUser.prototype, "currentMembership", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        type: mongoose_2.Schema.Types.Mixed,
    })),
    tslib_1.__metadata("design:type", Object)
], ClientUser.prototype, "billing", void 0);
exports.ClientUser = ClientUser = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ collection: "client-users" })
], ClientUser);
exports.ClientUserSchema = mongoose_1.SchemaFactory.createForClass(ClientUser);


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBusinessDto = void 0;
class UpdateBusinessDto {
}
exports.UpdateBusinessDto = UpdateBusinessDto;
// @Trim()
// @IsString()
// @MaxLength(64)
// @ApiProperty()
// country: string;
// @Trim()
// @MaxLength(64)
// @ApiProperty()
// phone1: string;
// @Trim()
// @IsString()
// @MaxLength(64)
// @ApiProperty()
// longName: string;
// @Trim()
// @IsString()
// @IsNotEmpty()
// @MaxLength(64)
// @ApiProperty()
// shortName: string;
// @Trim()
// @IsString()
// @IsNotEmpty()
// @MaxLength(164)
// @ApiProperty()
// description: string;
// @IsNotEmpty()
// @IsBoolean()
// @ApiProperty()
// isRegistrationCompleted: boolean;
// @IsArray()
// @IsNotEmpty()
// @ApiProperty()
// staff: [];
// @IsArray()
// @IsNotEmpty()
// @ApiProperty()
// categories: [];
// @IsArray()
// @IsNotEmpty()
// @ApiProperty()
// services: [];


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterBusinessDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(60);
const swagger_1 = __webpack_require__(5);
const class_sanitizer_1 = __webpack_require__(59);
class RegisterBusinessDto {
}
exports.RegisterBusinessDto = RegisterBusinessDto;
tslib_1.__decorate([
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(64),
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], RegisterBusinessDto.prototype, "shortName", void 0);
tslib_1.__decorate([
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(164),
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], RegisterBusinessDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], RegisterBusinessDto.prototype, "isRegistrationCompleted", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Array)
], RegisterBusinessDto.prototype, "staff", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Array)
], RegisterBusinessDto.prototype, "categories", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Array)
], RegisterBusinessDto.prototype, "services", void 0);


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const mongoose_1 = __webpack_require__(10);
const categories_controller_1 = __webpack_require__(79);
const categories_service_1 = __webpack_require__(80);
const categories_schema_1 = __webpack_require__(81);
let CategoriesModule = exports.CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: categories_schema_1.Categories.name, schema: categories_schema_1.CategoriesSchema },
            ]),
        ],
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService],
    })
], CategoriesModule);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const categories_service_1 = __webpack_require__(80);
const swagger_1 = __webpack_require__(5);
// TODO: this can be cache !!!
let CategoriesController = exports.CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    getAllCategories() {
        return this.categoriesService.getAllCategories();
    }
    getCategory(categoriesId) {
        return this.categoriesService.getCategory(categoriesId);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns all categories record",
        // type: CategoriesSuccessResponse,
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], CategoriesController.prototype, "getAllCategories", null);
tslib_1.__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns category record",
        // type: CategoriesSuccessResponse,
    }),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], CategoriesController.prototype, "getCategory", null);
exports.CategoriesController = CategoriesController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)("categories"),
    (0, common_1.Controller)("categories"),
    (0, swagger_1.ApiBearerAuth)("bearer"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof categories_service_1.CategoriesService !== "undefined" && categories_service_1.CategoriesService) === "function" ? _a : Object])
], CategoriesController);


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesService = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(17);
const mongoose_2 = __webpack_require__(10);
const config_1 = __webpack_require__(3);
const common_1 = __webpack_require__(9);
const categories_schema_1 = __webpack_require__(81);
let CategoriesService = exports.CategoriesService = class CategoriesService {
    constructor(categoriesModel, config) {
        this.categoriesModel = categoriesModel;
        this.config = config;
    }
    async getAllCategories() {
        try {
            const categories = await this.categoriesModel.find({});
            return categories;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getCategory(CategoriesId) {
        const Categories = await this.categoriesModel
            .findById({
            _id: CategoriesId,
        })
            .exec();
        return Categories;
    }
};
exports.CategoriesService = CategoriesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(categories_schema_1.Categories.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], CategoriesService);


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesSchema = exports.Categories = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(17);
let Categories = exports.Categories = class Categories extends mongoose_2.Document {
};
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Categories.prototype, "short_id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Categories.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Categories.prototype, "keys", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Categories.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Categories.prototype, "translations", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Categories.prototype, "isDefault", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Categories.prototype, "state", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Categories.prototype, "deleted", void 0);
exports.Categories = Categories = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Categories);
exports.CategoriesSchema = mongoose_1.SchemaFactory.createForClass(Categories);


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShortwaitsModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const mongoose_1 = __webpack_require__(10);
const shortwaits_controller_1 = __webpack_require__(83);
const shortwaits_schema_1 = __webpack_require__(84);
const shortwaits_service_1 = __webpack_require__(85);
const business_entity_1 = __webpack_require__(44);
const client_user_entity_1 = __webpack_require__(75);
let ShortwaitsModule = exports.ShortwaitsModule = class ShortwaitsModule {
};
exports.ShortwaitsModule = ShortwaitsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: shortwaits_schema_1.Shortwaits.name, schema: shortwaits_schema_1.ShortwaitsSchema },
                { name: business_entity_1.Business.name, schema: business_entity_1.BusinessSchema },
                { name: client_user_entity_1.ClientUser.name, schema: client_user_entity_1.ClientUserSchema },
            ]),
        ],
        controllers: [shortwaits_controller_1.ShortwaitsController],
        providers: [shortwaits_service_1.ShortwaitsService],
    })
], ShortwaitsModule);


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShortwaitsController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const swagger_1 = __webpack_require__(5);
const auth_decorator_1 = __webpack_require__(63);
const shortwaits_schema_1 = __webpack_require__(84);
const shortwaits_service_1 = __webpack_require__(85);
let ShortwaitsController = exports.ShortwaitsController = class ShortwaitsController {
    getAdminMobileDefaultData() {
        return this.shortwaitsService.getAdminMobileDefaultData();
    }
    getAdminWebDefaultData() {
        return this.shortwaitsService.getAdminMobileDefaultData();
    }
    getWebDefaultData() {
        return this.shortwaitsService.getAdminMobileDefaultData();
    }
    getClientWebDefaultData() {
        return this.shortwaitsService.getAdminMobileDefaultData();
    }
    getBusinessForBooking(businessShortId, clientUserId) {
        return this.shortwaitsService.getBusinessForBooking(businessShortId, clientUserId);
    }
};
tslib_1.__decorate([
    (0, common_1.Inject)(shortwaits_service_1.ShortwaitsService),
    tslib_1.__metadata("design:type", typeof (_a = typeof shortwaits_service_1.ShortwaitsService !== "undefined" && shortwaits_service_1.ShortwaitsService) === "function" ? _a : Object)
], ShortwaitsController.prototype, "shortwaitsService", void 0);
tslib_1.__decorate([
    (0, common_1.Get)("admin/mobile"),
    (0, auth_decorator_1.Public)(),
    (0, swagger_1.ApiCreatedResponse)({
        status: 200,
        description: "Returns default data for admin mobile",
        type: shortwaits_schema_1.Shortwaits,
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ShortwaitsController.prototype, "getAdminMobileDefaultData", null);
tslib_1.__decorate([
    (0, common_1.Get)("admin/web"),
    (0, auth_decorator_1.Public)(),
    (0, swagger_1.ApiCreatedResponse)({
        status: 200,
        description: "Returns default data for admin mobile",
        type: shortwaits_schema_1.Shortwaits,
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ShortwaitsController.prototype, "getAdminWebDefaultData", null);
tslib_1.__decorate([
    (0, common_1.Get)("client/mobile"),
    (0, auth_decorator_1.Public)(),
    (0, swagger_1.ApiCreatedResponse)({
        status: 200,
        description: "Returns default data for admin mobile",
        type: shortwaits_schema_1.Shortwaits,
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ShortwaitsController.prototype, "getWebDefaultData", null);
tslib_1.__decorate([
    (0, common_1.Get)("client/web"),
    (0, auth_decorator_1.Public)(),
    (0, swagger_1.ApiCreatedResponse)({
        status: 200,
        description: "Returns default data for admin mobile",
        type: shortwaits_schema_1.Shortwaits,
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ShortwaitsController.prototype, "getClientWebDefaultData", null);
tslib_1.__decorate([
    (0, common_1.Get)("booking"),
    (0, auth_decorator_1.Public)(),
    (0, swagger_1.ApiQuery)({
        name: "businessShortId",
        required: true,
        description: "The business short ID",
    }),
    (0, swagger_1.ApiQuery)({
        name: "clientUserId",
        required: false,
        description: "The client user ID (optional)",
    }),
    (0, swagger_1.ApiCreatedResponse)({
        status: 200,
        description: "Returns default data for admin mobile",
        type: shortwaits_schema_1.Shortwaits,
    }),
    tslib_1.__param(0, (0, common_1.Query)("businessShortId")),
    tslib_1.__param(1, (0, common_1.Query)("clientUserId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ShortwaitsController.prototype, "getBusinessForBooking", null);
exports.ShortwaitsController = ShortwaitsController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)("shortwaits"),
    (0, common_1.Controller)("shortwaits")
], ShortwaitsController);


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShortwaitsSchema = exports.Shortwaits = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(17);
const shared_lib_1 = __webpack_require__(18);
let Shortwaits = exports.Shortwaits = class Shortwaits extends mongoose_2.Document {
};
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Shortwaits.prototype, "subscriptionPlans", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Shortwaits.prototype, "banners", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Shortwaits.prototype, "short_id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Shortwaits.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Shortwaits.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Shortwaits.prototype, "links", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Shortwaits.prototype, "suggestedLang", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Shortwaits.prototype, "blackList", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Shortwaits.prototype, "timeZones", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Shortwaits.prototype, "categories", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        services: { type: Array },
        currencies: { type: Array },
        hours: { type: Object },
    })),
    tslib_1.__metadata("design:type", Object)
], Shortwaits.prototype, "sampleBusinessData", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    tslib_1.__metadata("design:type", typeof (_a = typeof shared_lib_1.ServiceColorsType !== "undefined" && shared_lib_1.ServiceColorsType) === "function" ? _a : Object)
], Shortwaits.prototype, "serviceColors", void 0);
exports.Shortwaits = Shortwaits = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Shortwaits);
exports.ShortwaitsSchema = mongoose_1.SchemaFactory.createForClass(Shortwaits);


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShortwaitsService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const shortwaits_schema_1 = __webpack_require__(84);
const mongoose_1 = __webpack_require__(17);
const mongoose_2 = __webpack_require__(10);
const client_user_entity_1 = __webpack_require__(75);
const business_entity_1 = __webpack_require__(44);
const mongoDbUtils_1 = __webpack_require__(86);
const converters_1 = __webpack_require__(53);
const DEFAULT = {
    short_id: "0000001",
};
let ShortwaitsService = exports.ShortwaitsService = class ShortwaitsService {
    constructor(shortwaitsModel, businessModel, clientUserModel) {
        this.shortwaitsModel = shortwaitsModel;
        this.businessModel = businessModel;
        this.clientUserModel = clientUserModel;
    }
    async getAdminMobileDefaultData() {
        const defaultAdminMobileDataArr = await this.shortwaitsModel.find(DEFAULT);
        /**will be distributed based on location (can be filtered by other means ???)*/
        const defaultAdminMobileData = defaultAdminMobileDataArr.find(elem => elem.short_id === "0000001");
        return defaultAdminMobileData;
    }
    async getBusinessForBooking(shortId, clientUserId) {
        try {
            let client = null;
            let businesses = null;
            console.log("shortId", shortId);
            if ((0, converters_1.validateId)(clientUserId)) {
                const id = (0, converters_1.convertStringToObjectId)(clientUserId);
                client = await this.clientUserModel.findById(id).exec();
                if (!client) {
                    client = null;
                }
            }
            if (shortId) {
                const prohibitedValues = [
                    "deleted",
                    "clients",
                    "isRegistrationCompleted",
                    "admins",
                    "superAdmins",
                    "backgroundAdmins",
                    "createdBy",
                    "updatedBy",
                    "taggedClients",
                    "accountType",
                ];
                const query = (0, mongoDbUtils_1.getQuerySelect)(prohibitedValues);
                console.log("query", query);
                businesses = await this.businessModel.find({ shortId }).select(query).exec();
                console.log("businesses", businesses);
            }
            return {
                businesses,
                client,
            };
        }
        catch (error) {
            // Handle any errors here, e.g., log the error or return an error response
            console.log(error);
            throw new Error("An error occurred while fetching data.");
        }
    }
};
exports.ShortwaitsService = ShortwaitsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(shortwaits_schema_1.Shortwaits.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(business_entity_1.Business.name)),
    tslib_1.__param(2, (0, mongoose_2.InjectModel)(client_user_entity_1.ClientUser.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _c : Object])
], ShortwaitsService);


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getQuerySelect = void 0;
function getQuerySelect(exclude = [], include = []) {
    const selectObject = {};
    include.forEach(key => {
        selectObject[key] = 1;
    });
    exclude.forEach(key => {
        selectObject[key] = 0;
    });
    return selectObject;
}
exports.getQuerySelect = getQuerySelect;


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessUsersModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const mongoose_1 = __webpack_require__(10);
const business_users_service_1 = __webpack_require__(88);
const business_users_controller_1 = __webpack_require__(89);
const business_user_entity_1 = __webpack_require__(16);
let BusinessUsersModule = exports.BusinessUsersModule = class BusinessUsersModule {
};
exports.BusinessUsersModule = BusinessUsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: business_user_entity_1.BusinessUser.name,
                    schema: business_user_entity_1.BusinessUserSchema,
                },
            ]),
        ],
        providers: [business_users_service_1.BusinessUserService],
        controllers: [business_users_controller_1.BusinessUsersController],
    })
], BusinessUsersModule);


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessUserService = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(17);
const common_1 = __webpack_require__(9);
const mongoose_2 = __webpack_require__(10);
const business_user_entity_1 = __webpack_require__(16);
const filtersForDtos_1 = __webpack_require__(54);
let BusinessUserService = exports.BusinessUserService = class BusinessUserService {
    constructor(businessUserModel) {
        this.businessUserModel = businessUserModel;
    }
    async findMultiple(userIds) {
        if (!userIds || userIds.length === 0) {
            return [];
        }
        try {
            const uniqueUserIds = [...new Set(userIds)];
            const businessUsers = await this.businessUserModel.find({ _id: { $in: uniqueUserIds } }).exec();
            return businessUsers;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async create(createCustomerDto) {
        const existingUser = await this.businessUserModel.findOne({ username: createCustomerDto.username }).exec();
        if (existingUser) {
            throw new common_1.NotFoundException(`Business User #${createCustomerDto.username} already exists`);
        }
        try {
            const newCustomer = await this.businessUserModel.create((0, filtersForDtos_1.getFilteredBusinessUser)(createCustomerDto));
            return newCustomer;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async findByUserName(username) {
        try {
            return await this.businessUserModel.findOne({ username: username }).exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async findById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException("Invalid ID");
        }
        try {
            const businessUser = await this.businessUserModel.findById({ _id: id, deleted: false }).exec();
            console.log("businessUser >>>", businessUser);
            return businessUser;
        }
        catch (error) {
            console.log("businessUser error >>>", error);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async update(userId, UpdateBusinessUserDto) {
        const existingUser = await this.businessUserModel.findByIdAndUpdate({ _id: userId }, UpdateBusinessUserDto);
        if (!existingUser) {
            throw new common_1.NotFoundException(`Customer #${userId} not found`);
        }
        return existingUser;
    }
    async remove(userId) {
        const deletedUser = await this.businessUserModel.findByIdAndRemove(userId);
        return deletedUser;
    }
};
exports.BusinessUserService = BusinessUserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(business_user_entity_1.BusinessUser.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], BusinessUserService);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BusinessUsersController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const swagger_1 = __webpack_require__(5);
const business_users_service_1 = __webpack_require__(88);
const guards_1 = __webpack_require__(64);
const dto_1 = __webpack_require__(90);
let BusinessUsersController = exports.BusinessUsersController = class BusinessUsersController {
    constructor(businessUserService) {
        this.businessUserService = businessUserService;
    }
    async getMultipleUsers(userIds) {
        // todo: validate permission with business
        return await this.businessUserService.findMultiple(userIds);
    }
    async create(dto) {
        return await this.businessUserService.create(dto);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)("multiple"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessUsersController.prototype, "getMultipleUsers", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof dto_1.CreateBusinessUserDto !== "undefined" && dto_1.CreateBusinessUserDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BusinessUsersController.prototype, "create", null);
exports.BusinessUsersController = BusinessUsersController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)("business-user"),
    (0, common_1.Controller)("business-user"),
    (0, swagger_1.ApiBearerAuth)("bearer"),
    (0, common_1.UseGuards)(guards_1.AtGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof business_users_service_1.BusinessUserService !== "undefined" && business_users_service_1.BusinessUserService) === "function" ? _a : Object])
], BusinessUsersController);


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(91), exports);
tslib_1.__exportStar(__webpack_require__(92), exports);


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBusinessUserDto = void 0;
class UpdateBusinessUserDto {
}
exports.UpdateBusinessUserDto = UpdateBusinessUserDto;


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBusinessUserDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(60);
const swagger_1 = __webpack_require__(5);
const shared_lib_1 = __webpack_require__(18);
class CreateBusinessUserDto {
}
exports.CreateBusinessUserDto = CreateBusinessUserDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateBusinessUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateBusinessUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateBusinessUserDto.prototype, "isPasswordProtected", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateBusinessUserDto.prototype, "preferredAlias", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateBusinessUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof shared_lib_1.ConvertToDtoType !== "undefined" && shared_lib_1.ConvertToDtoType) === "function" ? _a : Object)
], CreateBusinessUserDto.prototype, "hours", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateBusinessUserDto.prototype, "displayName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateBusinessUserDto.prototype, "familyName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateBusinessUserDto.prototype, "givenName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateBusinessUserDto.prototype, "middleName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateBusinessUserDto.prototype, "accountImageUrl", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateBusinessUserDto.prototype, "primaryPhoneNumberLabel", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateBusinessUserDto.prototype, "phoneNumbers", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateBusinessUserDto.prototype, "imAddresses", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateBusinessUserDto.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateBusinessUserDto.prototype, "socialAccounts", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateBusinessUserDto.prototype, "birthday", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateBusinessUserDto.prototype, "desiredCurrencies", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof shared_lib_1.ConvertToDtoType !== "undefined" && shared_lib_1.ConvertToDtoType) === "function" ? _b : Object)
], CreateBusinessUserDto.prototype, "locale", void 0);


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const events_service_1 = __webpack_require__(94);
const events_controller_1 = __webpack_require__(96);
const mongoose_1 = __webpack_require__(10);
const events_entity_1 = __webpack_require__(95);
const service_entity_1 = __webpack_require__(45);
const business_entity_1 = __webpack_require__(44);
const business_user_entity_1 = __webpack_require__(16);
const client_user_entity_1 = __webpack_require__(75);
let EventsModule = exports.EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: events_entity_1.Events.name,
                    schema: events_entity_1.EventsSchema,
                },
                {
                    name: service_entity_1.Service.name,
                    schema: service_entity_1.ServiceSchema,
                },
                {
                    name: business_entity_1.Business.name,
                    schema: business_entity_1.BusinessSchema,
                },
                {
                    name: business_user_entity_1.BusinessUser.name,
                    schema: business_user_entity_1.BusinessUserSchema,
                },
                {
                    name: client_user_entity_1.ClientUser.name,
                    schema: client_user_entity_1.ClientUserSchema,
                },
            ]),
        ],
        controllers: [events_controller_1.EventsController],
        providers: [events_service_1.EventsService],
    })
], EventsModule);


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const mongoose_1 = __webpack_require__(10);
const mongoose_2 = __webpack_require__(17);
const business_entity_1 = __webpack_require__(44);
const service_entity_1 = __webpack_require__(45);
const business_user_entity_1 = __webpack_require__(16);
const events_entity_1 = __webpack_require__(95);
const converters_1 = __webpack_require__(53);
const filtersForDtos_1 = __webpack_require__(54);
const client_user_entity_1 = __webpack_require__(75);
const WEEK_DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let EventsService = exports.EventsService = class EventsService {
    constructor(eventsModel, businessModel, servicesModel, businessUserModel, clientUserModel) {
        this.eventsModel = eventsModel;
        this.businessModel = businessModel;
        this.servicesModel = servicesModel;
        this.businessUserModel = businessUserModel;
        this.clientUserModel = clientUserModel;
    }
    async createEvent(event, userId) {
        try {
            const businessRecord = await this.businessModel.findById(event.businessId);
            if (!businessRecord) {
                throw new common_1.UnauthorizedException("Business not found");
            }
            const isAdmin = businessRecord.admins.some(adminId => adminId.toString() === userId);
            if (!isAdmin) {
                throw new common_1.UnauthorizedException("User not found");
            }
            const isTaxable = false; // todo check later if events can be taxable
            if (isTaxable) {
                // do something
            }
            const _newEvent = (0, filtersForDtos_1.getFilteredNewEvent)(event, userId);
            console.log("New Event >>>", JSON.stringify(_newEvent, null, 2));
            const newEvent = await this.eventsModel.create(_newEvent);
            await businessRecord.updateOne({ $push: { events: newEvent._id } }).exec();
            return newEvent;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException("Failed to create event");
        }
    }
    async updateEvent(event, businessId, updatedBy) {
        try {
            const updatedEvent = await this.eventsModel.findOneAndUpdate({ _id: event._id, deleted: false }, { ...event, updatedBy }, { new: true });
            if (!updatedEvent) {
                throw new common_1.NotFoundException("Event not found");
            }
            return updatedEvent;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException("Failed to update event");
        }
    }
    async deleteEvent(eventId, deletedBy) {
        try {
            // Find and delete the event
            const deleteResult = await this.eventsModel
                .findOneAndUpdate({
                _id: eventId,
                deleted: false,
            }, {
                $set: {
                    deleted: true,
                    updatedBy: deletedBy,
                },
            }, { new: true })
                .exec();
            if (!deleteResult) {
                throw new common_1.NotFoundException("Event not found");
            }
            await this.businessModel.updateOne({ events: eventId }, { $pull: { events: eventId } }).exec();
            return deleteResult;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException("Failed to delete event");
        }
    }
    async deleteEvents(eventIds, deletedBy) {
        try {
            const _eventIds = (0, converters_1.convertArrayToObjectId)(eventIds);
            console.log(_eventIds);
            const updatedEvents = await this.eventsModel
                .updateMany({
                _id: { $in: _eventIds },
                deleted: false,
            }, {
                $set: {
                    deleted: true,
                    updatedBy: deletedBy,
                },
            })
                .exec();
            if (updatedEvents.modifiedCount === 0) {
                return {
                    modifiedEventCount: updatedEvents.modifiedCount,
                    modifiedBusinessCount: 0,
                    modifiedClientCount: null, //pending
                };
            }
            const updatedBusiness = await this.businessModel
                .updateOne({ events: { $in: _eventIds } }, { $pullAll: { events: _eventIds } })
                .exec();
            return {
                modifiedCount: updatedEvents.modifiedCount,
                modifiedBusinessCount: updatedBusiness.modifiedCount,
                modifiedClientCount: null, //pending
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException("Failed to delete events");
        }
    }
    async getEventsSummaryByBusiness(businessId) {
        try {
            const filter = { businessId };
            const events = await this.eventsModel.find(filter).select("payment").exec();
            const totalAmountPerDayHour = {};
            const totalAmountPerWeekDay = {
                Sun: 0,
                Mon: 0,
                Tue: 0,
                Wed: 0,
                Thu: 0,
                Fri: 0,
                Sat: 0,
            };
            const totalAmountPerMonthDay = {};
            const totalAmountPerYearMonth = {};
            for (let hour = 0; hour < 24; hour++) {
                totalAmountPerDayHour[hour] = 0;
            }
            for (let month = 0; month < 12; month++) {
                totalAmountPerYearMonth[month + 1] = 0;
            }
            events.forEach(item => {
                if (item.payment?.paymentProcessedOn) {
                    const date = new Date(item.payment.paymentProcessedOn);
                    const today = new Date(Date.now());
                    const daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
                    for (let day = 1; day <= daysInCurrentMonth; day++) {
                        totalAmountPerMonthDay[day] = 0;
                    }
                    if (date.getDate() === today.getDate()) {
                        const dayHourKey = date.getHours();
                        totalAmountPerDayHour[dayHourKey] += item.payment.amount || 0;
                    }
                    // Subtract 7 from the start and end to get the dates for last week
                    const lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7);
                    const lastWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6 - 7);
                    if (date.getFullYear() >= lastWeekStart.getFullYear() &&
                        date.getMonth() >= lastWeekStart.getMonth() &&
                        date.getDate() >= lastWeekStart.getDate() &&
                        date.getFullYear() <= lastWeekEnd.getFullYear() &&
                        date.getMonth() <= lastWeekEnd.getMonth() &&
                        date.getDate() <= lastWeekEnd.getDate()) {
                        const weekDayKey = date.getDay();
                        const weekDayFullName = WEEK_DAY[weekDayKey];
                        totalAmountPerWeekDay[weekDayFullName] += item.payment.amount || 0;
                    }
                    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
                        const monthDayKey = date.getDate();
                        totalAmountPerMonthDay[monthDayKey] += item.payment.amount || 0;
                    }
                    if (date.getFullYear() === today.getFullYear()) {
                        const monthKey = date.getMonth() + 1;
                        totalAmountPerYearMonth[monthKey] += item.payment.amount || 0;
                    }
                }
            });
            const response = {
                Yesterday: totalAmountPerDayHour,
                Week: totalAmountPerWeekDay,
                Month: totalAmountPerMonthDay,
                Year: totalAmountPerYearMonth,
            };
            return response;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException("Failed to get events");
        }
    }
    async getEventsByBusiness(businessId, paginateOptions, filterOptions) {
        try {
            const { page, limit } = paginateOptions ?? {};
            const skip = (page - 1) * limit;
            const { date, filterBy } = filterOptions ?? {};
            const _date = new Date(date);
            const filter = {
                businessId,
                deleted: false,
            };
            if (_date && filterBy === "day") {
                console.log({
                    $gte: _date,
                    $lte: new Date(_date.getTime() + 24 * 60 * 60 * 1000),
                });
                filter.startTime = {
                    $gte: _date,
                    $lte: new Date(_date.getTime() + 24 * 60 * 60 * 1000),
                };
            }
            else if (_date && filterBy === "month") {
                const startDate = new Date(_date.getFullYear(), _date.getMonth(), 1);
                const endDate = new Date(_date.getFullYear(), _date.getMonth() + 1, 0);
                filter.startTime = {
                    $gte: startDate,
                    $lte: endDate,
                };
            }
            else if (_date && filterBy === "year") {
                const startDate = new Date(_date.getFullYear(), 0, 1);
                const endDate = new Date(_date.getFullYear(), 11, 31);
                filter.startTime = {
                    $gte: startDate,
                    $lte: endDate,
                };
            }
            const events = await this.eventsModel.find(filter).skip(skip).limit(limit).exec();
            return events;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException("Failed to get events");
        }
    }
    async findClientUsers(userIds) {
        if (!userIds || !userIds.length) {
            return [];
        }
        try {
            const clientUsers = await this.clientUserModel.find({ _id: { $in: userIds } }).exec();
            return clientUsers;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async findBusinessUsers(userIds) {
        if (!userIds || !userIds.length) {
            return [];
        }
        try {
            const clientUsers = await this.businessUserModel.find({ _id: { $in: userIds } }).exec();
            return clientUsers;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    // todo: allow business admin to have visibility to all events people
    async getPeopleByEvent(eventId, requestedBy) {
        try {
            const filter = { _id: eventId };
            const event = await this.eventsModel.findOne(filter).exec();
            if (!event) {
                throw new common_1.NotFoundException("Event not found");
            }
            // check if event.clientIds or event.staffIds is not empty and is a valid array else return empty arrays
            if ((!event.clientsIds || !event.clientsIds.length) && (!event.staffIds || !event.staffIds.length)) {
                return { clientUsers: [], businessUsers: [] };
            }
            // turn all ids to string and push only unique ids
            const eligibleUsers = [
                ...new Set([...event.clientsIds.map(id => id?.toString()), ...event.staffIds.map(id => id?.toString())]),
            ];
            if (!eligibleUsers.includes(requestedBy)) {
                throw new common_1.ForbiddenException("You are not allowed to view this event");
            }
            const [clientUsers, businessUsers] = await Promise.all([
                this.findClientUsers(event?.clientsIds),
                this.findBusinessUsers(event?.staffIds),
            ]);
            return { clientUsers, businessUsers, event };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
exports.EventsService = EventsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(events_entity_1.Events.name)),
    tslib_1.__param(1, (0, mongoose_1.InjectModel)(business_entity_1.Business.name)),
    tslib_1.__param(2, (0, mongoose_1.InjectModel)(service_entity_1.Service.name)),
    tslib_1.__param(3, (0, mongoose_1.InjectModel)(business_user_entity_1.BusinessUser.name)),
    tslib_1.__param(4, (0, mongoose_1.InjectModel)(client_user_entity_1.ClientUser.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object, typeof (_d = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _d : Object, typeof (_e = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _e : Object])
], EventsService);


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsSchema = exports.Events = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(10);
const swagger_1 = __webpack_require__(5);
const shared_lib_1 = __webpack_require__(18);
const mongoose_2 = __webpack_require__(17);
class EventUrls {
}
class EventLocation {
}
let Events = exports.Events = class Events extends mongoose_2.Document {
};
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Events.prototype, "expectedEndTime", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "registrationDeadlineTime", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: Array }),
    tslib_1.__metadata("design:type", typeof (_b = typeof shared_lib_1.EventPaymentMethodType !== "undefined" && shared_lib_1.EventPaymentMethodType) === "function" ? _b : Object)
], Events.prototype, "paymentMethod", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: Array }),
    tslib_1.__metadata("design:type", Array)
], Events.prototype, "participantsIds", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    tslib_1.__metadata("design:type", typeof (_c = typeof shared_lib_1.ObjectId !== "undefined" && shared_lib_1.ObjectId) === "function" ? _c : Object)
], Events.prototype, "leadClientId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Events.prototype, "urls", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", EventLocation)
], Events.prototype, "location", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Events.prototype, "attendeeLimit", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Events.prototype, "registrationFee", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    tslib_1.__metadata("design:type", typeof (_d = typeof shared_lib_1.ObjectId !== "undefined" && shared_lib_1.ObjectId) === "function" ? _d : Object)
], Events.prototype, "serviceId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Events.prototype, "staffIds", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Events.prototype, "clientsIds", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Boolean)
], Events.prototype, "hasNoDuration", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "leadClientName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "eventImage", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    tslib_1.__metadata("design:type", typeof (_e = typeof shared_lib_1.ObjectId !== "undefined" && shared_lib_1.ObjectId) === "function" ? _e : Object)
], Events.prototype, "businessId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    tslib_1.__metadata("design:type", typeof (_f = typeof shared_lib_1.ObjectId !== "undefined" && shared_lib_1.ObjectId) === "function" ? _f : Object)
], Events.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId }),
    tslib_1.__metadata("design:type", typeof (_g = typeof shared_lib_1.ObjectId !== "undefined" && shared_lib_1.ObjectId) === "function" ? _g : Object)
], Events.prototype, "updatedBy", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Events.prototype, "clients", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], Events.prototype, "features", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        type: mongoose_2.Schema.Types.Mixed,
    })),
    tslib_1.__metadata("design:type", Object)
], Events.prototype, "status", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Events.prototype, "durationInMin", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], Events.prototype, "startTime", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
], Events.prototype, "endTime", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "endTimeExpected", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Events.prototype, "priceExpected", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Events.prototype, "priceFinal", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Events.prototype, "canceled", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "cancellationReason", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Events.prototype, "isPublicEvent", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Events.prototype, "repeat", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        type: mongoose_2.Schema.Types.Mixed,
    })),
    tslib_1.__metadata("design:type", Object)
], Events.prototype, "payment", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        type: mongoose_2.Schema.Types.Mixed,
    })),
    tslib_1.__metadata("design:type", typeof (_k = typeof shared_lib_1.BusinessLabelsType !== "undefined" && shared_lib_1.BusinessLabelsType) === "function" ? _k : Object)
], Events.prototype, "labels", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Events.prototype, "deleted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Date, default: Date.now }),
    tslib_1.__metadata("design:type", typeof (_l = typeof Date !== "undefined" && Date) === "function" ? _l : Object)
], Events.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Date, default: Date.now }),
    tslib_1.__metadata("design:type", typeof (_m = typeof Date !== "undefined" && Date) === "function" ? _m : Object)
], Events.prototype, "updatedAt", void 0);
exports.Events = Events = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Events);
exports.EventsSchema = mongoose_1.SchemaFactory.createForClass(Events);
exports.EventsSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const swagger_1 = __webpack_require__(5);
const events_service_1 = __webpack_require__(94);
const create_event_dto_1 = __webpack_require__(97);
const guards_1 = __webpack_require__(64);
const events_entity_1 = __webpack_require__(95);
const get_events_by_business_dto_1 = __webpack_require__(99);
const shared_lib_1 = __webpack_require__(18);
let EventsController = exports.EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async getEventsSummaryByBusiness(businessId) {
        return this.eventsService.getEventsSummaryByBusiness(businessId);
    }
    // todo will validate if user in Business has permission to view events
    async getEventsByBusiness(businessId, query) {
        const { page = 1, limit = 10, date = new Date().toISOString(), filterBy = "year" } = query;
        console.log(page, limit, date, filterBy);
        return this.eventsService.getEventsByBusiness(businessId, {
            page,
            limit,
        }, {
            date,
            filterBy,
        });
    }
    createEventByBusiness(request, businessId, event) {
        // todo: validate permission with business
        return this.eventsService.createEvent(event, request.user.sub);
    }
    updateEventByBusiness(request, businessId, event) {
        // validate permission
        return this.eventsService.updateEvent(event, businessId, request.user.sub);
    }
    updateEventByUser(request, event) {
        // validate permission
        return this.eventsService.updateEvent(event, request.user.sub, request.user.sub);
    }
    async deleteEvent(request, eventId) {
        try {
            return await this.eventsService.deleteEvent(eventId, request.user.sub);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error(error);
            throw new common_1.InternalServerErrorException("Failed to delete event");
        }
    }
    async deleteEvents(request, eventIds) {
        return await this.eventsService.deleteEvents(eventIds, request.user.sub);
    }
    async getPeopleByEvent(request, eventId) {
        if (!eventId) {
            throw new common_1.NotFoundException("Event not found");
        }
        if (!request.user.sub) {
            throw new common_1.NotFoundException("User not found");
        }
        return await this.eventsService.getPeopleByEvent(eventId, request.user.sub);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("business/summary/:businessId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get a summary of all events in a business (business is NOT a user!!!)",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsController.prototype, "getEventsSummaryByBusiness", null);
tslib_1.__decorate([
    (0, common_1.Get)("business/:businessId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get all events in a business (business is NOT a user!!!)",
    }),
    tslib_1.__param(0, (0, common_1.Param)("businessId")),
    tslib_1.__param(1, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof get_events_by_business_dto_1.GetEventsByBusinessDto !== "undefined" && get_events_by_business_dto_1.GetEventsByBusinessDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsController.prototype, "getEventsByBusiness", null);
tslib_1.__decorate([
    (0, common_1.Post)("business/:businessId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.ACCEPTED,
        type: events_entity_1.Events,
        description: "Create new event record by Business User (not client user or business)",
    }),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)("businessId")),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, typeof (_c = typeof create_event_dto_1.CreateEventsDto !== "undefined" && create_event_dto_1.CreateEventsDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], EventsController.prototype, "createEventByBusiness", null);
tslib_1.__decorate([
    (0, common_1.Put)("business/:businessId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.ACCEPTED,
        description: "Create new event record",
        type: create_event_dto_1.CreateEventsDto,
    }),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)("businessId")),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, typeof (_d = typeof shared_lib_1.EventDtoType !== "undefined" && shared_lib_1.EventDtoType) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], EventsController.prototype, "updateEventByBusiness", null);
tslib_1.__decorate([
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.ACCEPTED,
        description: "Create new event record",
        type: create_event_dto_1.CreateEventsDto,
    }),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_e = typeof shared_lib_1.EventDtoType !== "undefined" && shared_lib_1.EventDtoType) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], EventsController.prototype, "updateEventByUser", null);
tslib_1.__decorate([
    (0, common_1.Put)("delete/:eventId"),
    (0, common_1.HttpCode)(202),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.ACCEPTED,
        description: "Event deleted successfully.",
    }),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Param)("eventId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsController.prototype, "deleteEvent", null);
tslib_1.__decorate([
    (0, common_1.Put)("delete"),
    (0, common_1.HttpCode)(202),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.ACCEPTED,
        description: "Events deleted successfully.",
    }),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsController.prototype, "deleteEvents", null);
tslib_1.__decorate([
    (0, common_1.Get)("people"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiCreatedResponse)({
        status: common_1.HttpStatus.OK,
        description: "Get all people involved in a event",
    }),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Query)("eventId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsController.prototype, "getPeopleByEvent", null);
exports.EventsController = EventsController = tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, swagger_1.ApiTags)("events"),
    (0, swagger_1.ApiBearerAuth)("bearer"),
    (0, common_1.Controller)("events"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof events_service_1.EventsService !== "undefined" && events_service_1.EventsService) === "function" ? _a : Object])
], EventsController);


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateEventsDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
const shared_lib_1 = __webpack_require__(18);
const class_validator_1 = __webpack_require__(60);
const class_transformer_1 = __webpack_require__(98);
class UrlDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UrlDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], UrlDto.prototype, "isSupported", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UrlDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UrlDto.prototype, "url", void 0);
class LocationDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], LocationDto.prototype, "address", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], LocationDto.prototype, "latitude", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], LocationDto.prototype, "longitude", void 0);
class CreateEventsDto {
}
exports.CreateEventsDto = CreateEventsDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", String)
], CreateEventsDto.prototype, "registrationDeadlineTime", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    tslib_1.__metadata("design:type", String)
], CreateEventsDto.prototype, "expectedEndTime", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsIn)(shared_lib_1.eventPaymentMethodsKeys),
    tslib_1.__metadata("design:type", typeof (_a = typeof shared_lib_1.EventPaymentMethodType !== "undefined" && shared_lib_1.EventPaymentMethodType) === "function" ? _a : Object)
], CreateEventsDto.prototype, "paymentMethod", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    tslib_1.__metadata("design:type", Array)
], CreateEventsDto.prototype, "participantsIds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", String)
], CreateEventsDto.prototype, "leadClientId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UrlDto),
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", Array)
], CreateEventsDto.prototype, "urls", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => LocationDto),
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", LocationDto)
], CreateEventsDto.prototype, "location", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", Number)
], CreateEventsDto.prototype, "attendeeLimit", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", String)
], CreateEventsDto.prototype, "registrationDeadline", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", Number)
], CreateEventsDto.prototype, "registrationFee", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    tslib_1.__metadata("design:type", String)
], CreateEventsDto.prototype, "serviceId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, swagger_1.ApiProperty)({ required: true }),
    tslib_1.__metadata("design:type", Array)
], CreateEventsDto.prototype, "staffIds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, swagger_1.ApiProperty)({ required: true }),
    tslib_1.__metadata("design:type", Array)
], CreateEventsDto.prototype, "clientsIds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", Boolean)
], CreateEventsDto.prototype, "hasNoDuration", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", String)
], CreateEventsDto.prototype, "eventImage", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    tslib_1.__metadata("design:type", String)
], CreateEventsDto.prototype, "businessId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    tslib_1.__metadata("design:type", String)
], CreateEventsDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    tslib_1.__metadata("design:type", String)
], CreateEventsDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateEventsDto.prototype, "features", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateEventsDto.prototype, "durationInMin", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], CreateEventsDto.prototype, "startTime", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], CreateEventsDto.prototype, "endTime", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateEventsDto.prototype, "priceExpected", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateEventsDto.prototype, "isPublicEvent", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", Boolean)
], CreateEventsDto.prototype, "repeat", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", Object)
], CreateEventsDto.prototype, "payment", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateEventsDto.prototype, "notes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", typeof (_b = typeof shared_lib_1.BusinessLabelsType !== "undefined" && shared_lib_1.BusinessLabelsType) === "function" ? _b : Object)
], CreateEventsDto.prototype, "labels", void 0);


/***/ }),
/* 98 */
/***/ ((module) => {

"use strict";
module.exports = require("class-transformer");

/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetEventsByBusinessDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(60);
class GetEventsByBusinessDto {
}
exports.GetEventsByBusinessDto = GetEventsByBusinessDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], GetEventsByBusinessDto.prototype, "page", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], GetEventsByBusinessDto.prototype, "limit", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: new Date().toISOString() }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], GetEventsByBusinessDto.prototype, "date", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        enum: ["day", "month", "year"],
        default: "year",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(["day", "month", "year"]),
    tslib_1.__metadata("design:type", String)
], GetEventsByBusinessDto.prototype, "filterBy", void 0);


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicesModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const services_service_1 = __webpack_require__(101);
const services_controller_1 = __webpack_require__(102);
const mongoose_1 = __webpack_require__(10);
const service_entity_1 = __webpack_require__(45);
const business_entity_1 = __webpack_require__(44);
let ServicesModule = exports.ServicesModule = class ServicesModule {
};
exports.ServicesModule = ServicesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: service_entity_1.Service.name,
                    schema: service_entity_1.ServiceSchema,
                },
                {
                    name: business_entity_1.Business.name,
                    schema: business_entity_1.BusinessSchema,
                },
            ]),
        ],
        controllers: [services_controller_1.ServicesController],
        providers: [services_service_1.ServicesService],
    })
], ServicesModule);


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicesService = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(17);
const common_1 = __webpack_require__(9);
const mongoose_2 = __webpack_require__(10);
const config_1 = __webpack_require__(3);
const service_entity_1 = __webpack_require__(45);
const business_entity_1 = __webpack_require__(44);
/**
 * docs
 * @url https://mongoosejs.com/docs/queries.html#queries-are-not-promises
 */
let ServicesService = exports.ServicesService = class ServicesService {
    constructor(serviceModel, businessModel, config) {
        this.serviceModel = serviceModel;
        this.businessModel = businessModel;
        this.config = config;
    }
    async create(createServiceDto) {
        const newService = await this.serviceModel.create(createServiceDto);
        return newService;
    }
    async findAll() {
        const services = await this.serviceModel.find({});
        return services;
    }
    async findByIds(servicesId) {
        const services = await this.serviceModel.find().where("_id").in(servicesId);
        console.log(services);
        return services;
    }
    async findOne(id) {
        const service = await this.serviceModel.findById(id);
        return service;
    }
    async update(id, updateServiceDto) {
        const updatedService = await this.serviceModel.findByIdAndUpdate(id, updateServiceDto);
        return updatedService;
    }
    async remove(id) {
        const deletedService = await this.serviceModel.findByIdAndDelete({
            _id: id,
        });
        return deletedService;
    }
    async findAllByBusiness(id) {
        console.log("businessID >>>", id);
        const businessServices = await this.businessModel.findById(id);
        console.log("businessServices >>>", businessServices.services);
        // const businessServicesIds = businessServices.map((e) => e.toString());
        const services = await this.serviceModel
            .find()
            .where("_id")
            .in(businessServices.services);
        console.log("services >>>", services);
        return services;
    }
};
exports.ServicesService = ServicesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(service_entity_1.Service.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(business_entity_1.Business.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], ServicesService);


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicesController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const services_service_1 = __webpack_require__(101);
const create_service_dto_1 = __webpack_require__(103);
const update_service_dto_1 = __webpack_require__(104);
const swagger_1 = __webpack_require__(5);
const guards_1 = __webpack_require__(64);
const getServiceQuery_1 = __webpack_require__(105);
let ServicesController = exports.ServicesController = class ServicesController {
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    /**
     * - this endpoint needs to be protected and should
     *   require search query parameters
     * - we should search by all available params and optimize
     */
    // @Get('all')
    // findAll() {
    //   return this.servicesService.findAll();
    // }
    create(createServiceDto) {
        return this.servicesService.create(createServiceDto);
    }
    //returns multiple services search by ids[]
    getServices(query, dto) {
        if (query.businessId) {
            return this.servicesService.findAllByBusiness(query.businessId);
        }
        if (query.serviceId) {
            return this.servicesService.findOne(query.serviceId);
        }
        if (dto.services &&
            Array.isArray(dto.services) &&
            dto.services.length > 0) {
            return this.servicesService.findByIds(dto.services);
        }
        throw new common_1.NotAcceptableException("incorrect service value");
    }
    // @Get('by-ids/:business_id')
    // findByBusiness(@Param('business_id') businessId: string) {
    //   return this.servicesService.findAllByBusiness(businessId);
    // }
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.servicesService.findOne(id);
    // }
    update(serviceId, updateServiceDto) {
        return this.servicesService.update(serviceId, updateServiceDto);
    }
    updateSome(serviceId, updateServiceDto) {
        return this.servicesService.update(serviceId, updateServiceDto);
    }
    remove(serviceId) {
        return this.servicesService.remove(serviceId);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_service_dto_1.CreateServiceDto !== "undefined" && create_service_dto_1.CreateServiceDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ServicesController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof getServiceQuery_1.GetServicesQuery !== "undefined" && getServiceQuery_1.GetServicesQuery) === "function" ? _c : Object, typeof (_d = typeof getServiceQuery_1.GetServicesDto !== "undefined" && getServiceQuery_1.GetServicesDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ServicesController.prototype, "getServices", null);
tslib_1.__decorate([
    (0, common_1.Put)(":serviceId"),
    tslib_1.__param(0, (0, common_1.Param)("serviceId")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_e = typeof update_service_dto_1.UpdateServiceDto !== "undefined" && update_service_dto_1.UpdateServiceDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ServicesController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Patch)(":serviceId"),
    tslib_1.__param(0, (0, common_1.Param)("serviceId")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_f = typeof update_service_dto_1.UpdateServiceDto !== "undefined" && update_service_dto_1.UpdateServiceDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ServicesController.prototype, "updateSome", null);
tslib_1.__decorate([
    (0, common_1.Delete)(":serviceId"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ServicesController.prototype, "remove", null);
exports.ServicesController = ServicesController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)("services"),
    (0, common_1.Controller)("services"),
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, swagger_1.ApiBearerAuth)("bearer"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_service_1.ServicesService !== "undefined" && services_service_1.ServicesService) === "function" ? _a : Object])
], ServicesController);


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateServiceDto = void 0;
class CreateServiceDto {
}
exports.CreateServiceDto = CreateServiceDto;


/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateServiceDto = void 0;
const swagger_1 = __webpack_require__(5);
const create_service_dto_1 = __webpack_require__(103);
class UpdateServiceDto extends (0, swagger_1.PartialType)(create_service_dto_1.CreateServiceDto) {
}
exports.UpdateServiceDto = UpdateServiceDto;


/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetServicesQuery = exports.GetServicesDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
class GetServicesDto {
}
exports.GetServicesDto = GetServicesDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'services',
        format: 'array',
        required: false,
    }),
    tslib_1.__metadata("design:type", Array)
], GetServicesDto.prototype, "services", void 0);
class GetServicesQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return {
            sortBy: { type: () => [String] },
        };
    }
}
exports.GetServicesQuery = GetServicesQuery;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'businessId',
        format: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], GetServicesQuery.prototype, "businessId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'serviceId',
        format: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], GetServicesQuery.prototype, "serviceId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        minimum: 0,
        maximum: 10000,
        title: 'Page',
        exclusiveMaximum: true,
        exclusiveMinimum: true,
        format: 'int32',
        default: 0,
        required: false,
    }),
    tslib_1.__metadata("design:type", Number)
], GetServicesQuery.prototype, "page", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: '_sortBy',
        required: false,
    }),
    tslib_1.__metadata("design:type", Array)
], GetServicesQuery.prototype, "sortBy", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'limit',
        required: false,
    }),
    tslib_1.__metadata("design:type", Number)
], GetServicesQuery.prototype, "limit", void 0);


/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientUserModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const mongoose_1 = __webpack_require__(10);
const client_user_service_1 = __webpack_require__(107);
const client_user_controller_1 = __webpack_require__(108);
const client_user_entity_1 = __webpack_require__(75);
let ClientUserModule = exports.ClientUserModule = class ClientUserModule {
};
exports.ClientUserModule = ClientUserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: client_user_entity_1.ClientUser.name,
                    schema: client_user_entity_1.ClientUserSchema,
                },
            ]),
        ],
        providers: [client_user_service_1.ClientUserService],
        controllers: [client_user_controller_1.ClientUserController],
    })
], ClientUserModule);


/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientUserService = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(17);
const common_1 = __webpack_require__(9);
const mongoose_2 = __webpack_require__(10);
const client_user_entity_1 = __webpack_require__(75);
const filtersForDtos_1 = __webpack_require__(54);
let ClientUserService = exports.ClientUserService = class ClientUserService {
    constructor(clientUserModel) {
        this.clientUserModel = clientUserModel;
    }
    async findMultiple(userIds) {
        if (!userIds || !userIds.length) {
            return [];
        }
        try {
            const clientUsers = await this.clientUserModel.find({ _id: { $in: userIds } }).exec();
            return clientUsers;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async create(createCustomerDto) {
        const existingUser = await this.clientUserModel.findOne({ username: createCustomerDto.username }).exec();
        if (existingUser) {
            throw new common_1.NotFoundException(`User #${createCustomerDto.username} already exists`);
        }
        try {
            const newCustomer = await this.clientUserModel.create((0, filtersForDtos_1.getFilteredClientUser)(createCustomerDto));
            return newCustomer;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
exports.ClientUserService = ClientUserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(client_user_entity_1.ClientUser.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], ClientUserService);


/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientUserController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const swagger_1 = __webpack_require__(5);
const client_user_service_1 = __webpack_require__(107);
const dto_1 = __webpack_require__(109);
const guards_1 = __webpack_require__(64);
let ClientUserController = exports.ClientUserController = class ClientUserController {
    constructor(clientUsersService) {
        this.clientUsersService = clientUsersService;
    }
    async getMultipleUsers(userIds) {
        // todo: validate permission with business
        console.log("userIds", userIds);
        return await this.clientUsersService.findMultiple(userIds);
    }
    async create(dto) {
        return await this.clientUsersService.create(dto);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)("multiple"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientUserController.prototype, "getMultipleUsers", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof dto_1.CreateClientUserDto !== "undefined" && dto_1.CreateClientUserDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientUserController.prototype, "create", null);
exports.ClientUserController = ClientUserController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)("client-user"),
    (0, common_1.Controller)("client-user"),
    (0, swagger_1.ApiBearerAuth)("bearer"),
    (0, common_1.UseGuards)(guards_1.AtGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof client_user_service_1.ClientUserService !== "undefined" && client_user_service_1.ClientUserService) === "function" ? _a : Object])
], ClientUserController);


/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(110), exports);
tslib_1.__exportStar(__webpack_require__(111), exports);


/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateClientUserDto = void 0;
class UpdateClientUserDto {
}
exports.UpdateClientUserDto = UpdateClientUserDto;


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateClientUserDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(60);
const swagger_1 = __webpack_require__(5);
class CreateClientUserDto {
}
exports.CreateClientUserDto = CreateClientUserDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateClientUserDto.prototype, "clientType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateClientUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateClientUserDto.prototype, "alias", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateClientUserDto.prototype, "givenName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateClientUserDto.prototype, "familyName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateClientUserDto.prototype, "displayName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateClientUserDto.prototype, "middleName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateClientUserDto.prototype, "accountImageUrl", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateClientUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateClientUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Object)
], CreateClientUserDto.prototype, "locale", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateClientUserDto.prototype, "phoneNumbers", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateClientUserDto.prototype, "imAddresses", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateClientUserDto.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateClientUserDto.prototype, "socialAccounts", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Array)
], CreateClientUserDto.prototype, "desiredCurrencies", void 0);


/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEnvPath = void 0;
const fs_1 = __webpack_require__(7);
const path_1 = __webpack_require__(113);
const NODE_ENV = process.env.NODE_ENV;
const ASSETS_PATH = `${__dirname}/assets/`;
function getEnvPath() {
    const filename = NODE_ENV === "Production" ? `.env` : ".env.development";
    const filePath = (0, path_1.resolve)(ASSETS_PATH + filename);
    if (!(0, fs_1.existsSync)(filePath)) {
        throw new Error("Cannot find env file!!!");
    }
    if (NODE_ENV !== "Production") {
        console.log(`Env file path: ${filePath}`);
    }
    return filePath;
}
exports.getEnvPath = getEnvPath;


/***/ }),
/* 113 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MongooseConfigService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const config_1 = __webpack_require__(3);
let MongooseConfigService = exports.MongooseConfigService = class MongooseConfigService {
    createMongooseOptions() {
        console.log("MONGO_DB_DATABASE >>>", this.config.get("MONGO_DB_DATABASE"));
        return {
            uri: this.config.get("MONGO_DB_URL"),
            // connectionName: this.config.get<string>('MONGO_DB_DATABASE'),
        };
    }
};
tslib_1.__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    tslib_1.__metadata("design:type", typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object)
], MongooseConfigService.prototype, "config", void 0);
exports.MongooseConfigService = MongooseConfigService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], MongooseConfigService);


/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformInterceptor = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(9);
const operators_1 = __webpack_require__(116);
const config_1 = __webpack_require__(3);
const package_json_1 = __webpack_require__(117);
let TransformInterceptor = exports.TransformInterceptor = class TransformInterceptor {
    constructor(configService) {
        this.configService = configService;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)(payload => {
            let meta = null;
            let message = null;
            let errorCode = null;
            const statusCode = context.switchToHttp().getResponse().statusCode;
            // console.log("payload >>>", payload);
            // console.log("statusCode >>>", statusCode);
            if (typeof payload === "object" && payload?.meta) {
                meta = payload.meta;
                delete payload.meta;
            }
            if (typeof payload === "object" && payload?.message) {
                message = payload.message;
                delete payload.message;
            }
            if (typeof payload === "object" && payload?.errorCode) {
                errorCode = payload.errorCode;
                delete payload.errorCode;
            }
            if (statusCode >= 400) {
                return {
                    data: null,
                    statusCode,
                    message,
                    errorCode,
                };
            }
            if (package_json_1.version) {
                context.switchToHttp().getResponse().header("X-App-Version", package_json_1.version);
            }
            return {
                data: payload ?? null,
                statusCode,
                meta,
            };
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], TransformInterceptor);


/***/ }),
/* 116 */
/***/ ((module) => {

"use strict";
module.exports = require("rxjs/operators");

/***/ }),
/* 117 */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"@shortwaits/source","version":"0.0.10","license":"MIT","private":true,"scripts":{"postinstall":"patch-package","sw-mobile-admin:react":"nx start sw-mobile-admin","sw-mobile-admin:pods":"nx run-pods sw-mobile-admin","sw-mobile-admin:ios":"nx run-ios sw-mobile-admin --install","sw-mobile-admin:android":"nx run-android sw-mobile-admin","sw-api":"nx serve sw-api","sw-api:run:prod":"node dist/apps/sw-api/main.js","sw-api:seed":"nx run sw-api:seed --configuration=default-data","sw-api:build":"npm run shared-lib:build && npm run sw-api:build:prod","sw-api:build:dev":"nx build sw-api --verbose","sw-api:build:prod":"nx build sw-api --verbose","sw-api:deploy:prod":"npm install && npm run sw-api:build:prod && npm run sw-api:run:prod","sw-web":"nx serve sw-web","shared-lib:build":"nx build shared-lib --verbose","test":"nx test","clean":"sh ./scripts/clean.sh","all":"nx run-many --target=serve --projects=sw-mobile-admin,sw-api,sw-web --parallel=3","generate-keypair":"ts-node ./src/scripts/create-key-pair","prepare":"husky install","push:main":"git push --follow-tags origin main"},"dependencies":{"@gorhom/bottom-sheet":"4.4.7","@gorhom/portal":"1.0.14","@nestjs/common":"^10.0.2","@nestjs/config":"3.0.0","@nestjs/core":"^10.0.2","@nestjs/jwt":"10.1.0","@nestjs/mongoose":"10.0.1","@nestjs/passport":"10.0.0","@nestjs/platform-express":"^10.0.2","@nestjs/swagger":"7.0.4","@ptomasroos/react-native-multi-slider":"^2.2.2","@react-native-clipboard/clipboard":"^1.11.2","@react-native-community/checkbox":"^0.5.12","@react-native-community/datetimepicker":"^6.3.1","@react-native-community/masked-view":"^0.1.11","@react-native-community/slider":"^4.3.0","@react-native-google-signin/google-signin":"^10.0.1","@react-native-picker/picker":"^2.4.3","@react-navigation/bottom-tabs":"^6.3.2","@react-navigation/devtools":"^6.0.8","@react-navigation/material-bottom-tabs":"^6.2.2","@react-navigation/native":"^6.0.11","@react-navigation/stack":"^6.2.2","@reduxjs/toolkit":"1.9.5","@shopify/flash-list":"^1.5.0","async-mutex":"^0.3.2","axios":"^1.0.0","bcryptjs":"^2.4.3","class-sanitizer":"^1.0.1","class-transformer":"^0.5.1","class-validator":"0.14.0","crypto":"^1.0.1","date-fns":"2.30.0","dotenv":"^16.0.0","emoji-datasource":"^14.0.0","formik":"^2.2.9","google-auth-library":"^9.0.0","googleapis":"^126.0.1","helmet":"^5.0.2","hoist-non-react-statics":"^3.3.1","jsonwebtoken":"^8.5.1","lodash":"^4.17.15","memoize-one":"^5.2.1","mongo-seeding":"^3.7.1","mongoose":"^6.5.1","mongoose-paginate-v2":"^1.7.0","next":"13.4.1","passport":"^0.5.2","passport-jwt":"^4.0.0","prettier":"^2.6.2","prop-types":"^15.5.10","react":"18.2.0","react-calendar":"^4.6.0","react-dom":"18.2.0","react-intl":"^6.4.4","react-native":"0.72.3","react-native-calendars":"1.1300.0","react-native-config":"1.5.0","react-native-contacts":"7.0.5","react-native-currency-input":"1.1.0","react-native-datepicker":"1.7.2","react-native-device-info":"^10.8.0","react-native-fast-image":"^8.6.3","react-native-flipper":"0.211.0","react-native-gesture-handler":"2.12.0","react-native-get-random-values":"^1.9.0","react-native-image-picker":"^4.8.4","react-native-linear-gradient":"^2.5.6","react-native-localize":"^2.2.6","react-native-mmkv":"^2.10.1","react-native-pager-view":"^6.2.0","react-native-paper":"^4.12.4","react-native-paper-dates":"^0.9.2","react-native-permissions":"^3.8.4","react-native-phone-input":"^1.3.6","react-native-picker-select":"^8.0.4","react-native-qrcode-svg":"^6.2.0","react-native-reanimated":"3.3.0","react-native-safe-area-context":"4.5.3","react-native-safe-area-view":"^1.1.1","react-native-screens":"3.24.0","react-native-shadow-2":"^5.1.2","react-native-share":"^9.2.3","react-native-spinkit":"^1.5.1","react-native-splash-screen":"^3.3.0","react-native-svg":"13.9.0","react-native-svg-transformer":"1.0.0","react-native-swipe-gestures":"^1.0.5","react-native-tab-view":"^3.5.2","react-native-timeline-flatlist":"^0.8.0","react-native-vector-icons":"10.0.0","react-redux":"8.1.1","recyclerlistview":"4.2.0","redux":"4.2.1","redux-flipper":"^2.0.1","redux-persist":"6.0.0","redux-thunk":"^2.3.0","reflect-metadata":"^0.1.13","rimraf":"^3.0.2","rxjs":"^7.8.0","swagger-themes":"^1.2.28","swagger-ui-express":"^4.3.0","tslib":"^2.3.0","typesafe-actions":"^5.1.0","uuid":"^9.0.0","victory-native":"36.6.11","xdate":"^0.8.2","yup":"^0.32.11"},"devDependencies":{"@babel/preset-react":"^7.14.5","@nestjs/schematics":"^10.0.1","@nestjs/testing":"^10.0.2","@nx/cypress":"16.8.1","@nx/detox":"16.6.0","@nx/eslint-plugin":"16.6.0","@nx/jest":"16.6.0","@nx/js":"16.8.1","@nx/linter":"16.6.0","@nx/nest":"16.6.0","@nx/next":"^16.8.1","@nx/node":"16.6.0","@nx/react":"16.8.1","@nx/react-native":"16.6.0","@nx/webpack":"16.6.0","@nx/workspace":"16.6.0","@react-native-community/cli":"11.3.5","@react-native-community/cli-platform-android":"11.3.5","@react-native-community/cli-platform-ios":"11.3.5","@react-native/metro-config":"^0.72.9","@testing-library/jest-dom":"5.16.5","@testing-library/jest-native":"5.4.2","@testing-library/react":"14.0.0","@testing-library/react-native":"12.1.2","@types/jest":"^29.4.0","@types/lodash":"^4.14.171","@types/node":"18.14.4","@types/react":"18.2.14","@types/react-dom":"18.2.6","@types/react-native":"0.72.2","@types/react-native-vector-icons":"^6.4.8","@types/react-redux":"^7.1.18","@types/redux":"^3.6.0","@types/redux-thunk":"^2.1.0","@types/uuid":"^9.0.2","@types/xdate":"^0.8.32","@typescript-eslint/eslint-plugin":"^5.60.1","@typescript-eslint/parser":"^5.60.1","babel-jest":"^29.4.1","cypress":"^13.0.0","detox":"^20.11.1","eslint":"~8.15.0","eslint-config-next":"13.4.1","eslint-config-prettier":"8.1.0","eslint-plugin-cypress":"^2.13.4","eslint-plugin-import":"2.27.5","eslint-plugin-jsx-a11y":"6.7.1","eslint-plugin-react":"7.32.2","eslint-plugin-react-hooks":"4.6.0","husky":"^8.0.3","jest":"^29.4.1","jest-circus":"^29.4.1","jest-environment-jsdom":"^29.4.1","jest-environment-node":"^29.4.1","jest-react-native":"18.0.0","metro":"0.76.7","metro-babel-register":"0.76.7","metro-config":"0.76.7","metro-react-native-babel-preset":"0.76.7","metro-react-native-babel-transformer":"0.76.7","metro-resolver":"0.76.7","nx":"16.6.0","nx-cloud":"latest","patch-package":"^6.4.7","prettier":"^2.6.2","react-test-renderer":"18.2.0","ts-jest":"^29.1.0","ts-node":"10.9.1","typescript":"~5.1.3"}}');

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const swagger_themes_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(5);
const helmet_1 = tslib_1.__importDefault(__webpack_require__(6));
const fs = tslib_1.__importStar(__webpack_require__(7));
const app_module_1 = __webpack_require__(8);
const API_PREFIX = "v1";
const DOCS_PREFIX = `${API_PREFIX}/docs`;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix(API_PREFIX);
    app.enableCors();
    app.use((0, helmet_1.default)());
    const HTTP_PORT = configService.get("HTTP_PORT");
    const HTTP_HOST = configService.get("HTTP_HOST");
    //swagger setup
    const theme = new swagger_themes_1.SwaggerTheme("v3");
    const options = new swagger_1.DocumentBuilder()
        .setTitle("Shortwaits Admin - API")
        .setDescription(html)
        .addServer("http://127.0.0.1:8080", "Dev server")
        .addServer("http://sw-api.us-east-1.elasticbeanstalk.com", "Staging server")
        .addServer("https://api.shortwaits.com", "Production server")
        .addBearerAuth()
        .setVersion("1.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup(DOCS_PREFIX, app, document, {
        explorer: true,
        customCss: theme.getBuffer("dark"),
    });
    fs.writeFile("swagger.json", JSON.stringify(document), err => {
        if (err)
            throw err;
        console.log("[DOCS] Swagger (OpenAPI) document saved to swagger.json");
    });
    await app.listen(HTTP_PORT, HTTP_HOST);
    const appUrl = await app.getUrl();
    console.log("[HTTP]", appUrl);
    console.log("[DOCS]", `${appUrl}/${DOCS_PREFIX}`);
}
bootstrap();
const html = `Shortwaits's successful response: <br>
<code>{data: [
{ id: 1, name: "Item 1" },
{ id: 2, name: "Item 2" },
{ id: 3, name: "Item 3" },
],<br>
statusCode: 200,<br>
meta: {
pagination: {
totalItems: 10,
totalPages: 2,
currentPage: 1,
itemsPerPage: 3,
},
},
}<code>
`;

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map