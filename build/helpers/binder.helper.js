"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinderNames = void 0;
const BinderNames = {
    GROUP: {
        CHECK: {
            ID_EXISTS: "GROUP_CHECK_ID_EXISTS",
            CAN_READ: "GROUP_CHECK_CAN_READ"
        }
    },
    POST: {
        CHECK: {
            ID_EXISTS: "POST_CHECK_ID_EXISTS",
            CAN_READ: "POST_CHECK_CAN_READ"
        }
    },
    REPLY: {
        CHECK: {
            ID_EXISTS: "REPLY_CHECK_ID_EXISTS",
            CAN_READ: "REPLY_CHECK_CAN_READ"
        }
    },
    USER: {
        EXTRACT: {
            USER_PROFILES: "USER_EXTRACT_USER_PROFILES"
        }
    }
};
exports.BinderNames = BinderNames;
