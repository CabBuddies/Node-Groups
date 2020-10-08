"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const mongoose = require("mongoose");
const schemas_1 = require("../schemas");
const postSchema = new mongoose.Schema({
    groupId: {
        type: String,
        required: 'groupId is required'
    },
    title: {
        type: String,
        trim: true,
        required: 'Post Title is required'
    },
    body: {
        type: String,
        trim: true,
        required: 'Post Body is required'
    },
    topics: [{
            type: String,
            trim: true
        }],
    author: {
        type: String,
        required: 'author is required'
    },
    active: {
        type: Boolean,
        default: true
    },
    stats: schemas_1.statsSchema,
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
const Post = db_1.primaryDb.model('Post', postSchema);
exports.default = Post;
