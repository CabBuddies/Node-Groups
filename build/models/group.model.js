"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const mongoose = require("mongoose");
const schemas_1 = require("../schemas");
const groupSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Group Title is required'
    },
    description: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        required: 'author is required'
    },
    displayPicture: {
        type: String,
        trim: true,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastModifiedAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    stats: schemas_1.statsSchema,
    topics: [{
            topic: {
                type: String,
                trim: true
            },
            count: {
                type: Number,
                default: 0
            }
        }],
    access: {
        type: {
            type: String,
            enum: ['public', 'followers', 'private'],
            default: 'public'
        },
        users: [
            String
        ]
    },
    customAttributes: mongoose.Schema.Types.Mixed
});
const Group = db_1.primaryDb.model('Group', groupSchema);
exports.default = Group;
