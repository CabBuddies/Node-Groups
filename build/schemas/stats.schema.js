"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const statsSchema = new mongoose.Schema({
    viewCount: {
        type: Number,
        default: 0
    },
    postCount: {
        type: Number,
        default: 0
    },
    replyCount: {
        type: Number,
        default: 0
    },
    followCount: {
        type: Number,
        default: 0
    },
    //query and response props
    upvoteCount: {
        type: Number,
        default: 0
    },
    downvoteCount: {
        type: Number,
        default: 0
    },
    spamreportCount: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    }
});
exports.default = statsSchema;
