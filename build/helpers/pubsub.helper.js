"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubMessageTypes = void 0;
const PubSubMessageTypes = {
    GROUP: {
        CREATED: "GROUP_CREATED",
        READ: "GROUP_READ",
        UPDATED: "GROUP_UPDATED",
        DELETED: "GROUP_DELETED"
    },
    POST: {
        CREATED: "POST_CREATED",
        READ: "POST_READ",
        UPDATED: "POST_UPDATED",
        DELETED: "POST_DELETED"
    },
    REPLY: {
        CREATED: "REPLY_CREATED",
        READ: "REPLY_READ",
        UPDATED: "REPLY_UPDATED",
        DELETED: "REPLY_DELETED"
    },
    OPINION: {
        CREATED: "OPINION_CREATED",
        DELETED: "OPINION_DELETED"
    }
};
exports.PubSubMessageTypes = PubSubMessageTypes;
