"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubEventTypes = void 0;
const PubSubEventTypes = {
    AUTH: {
        USER_CREATED: "AUTH_USER_CREATED",
        USER_SIGNED_IN: "AUTH_USER_SIGNED_IN",
        SIGN_OUT: "AUTH_SIGN_OUT",
        SIGN_OUT_ALL: "AUTH_SIGN_OUT_ALL",
        ACCESS_TOKEN: "AUTH_ACCESS_TOKEN"
    }
};
exports.PubSubEventTypes = PubSubEventTypes;
