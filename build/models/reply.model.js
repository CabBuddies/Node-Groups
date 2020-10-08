"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const mongoose = require("mongoose");
const replySchema = new mongoose.Schema({
    postId: {
        type: String,
        required: 'postId is required'
    },
    body: {
        type: String,
        trim: true,
        required: 'Reply body is required'
    },
    author: {
        type: String,
        required: 'author is required'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastModifiedAt: {
        type: Date,
        default: Date.now
    },
    customAttributes: mongoose.Schema.Types.Mixed
});
const Reply = db_1.primaryDb.model('Reply', replySchema);
exports.default = Reply;
