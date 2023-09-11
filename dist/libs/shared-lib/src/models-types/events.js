"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=events.js.map