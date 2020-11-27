"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const customAttributeSchema = new mongoose.Schema({
    key: {
        type: String,
        required: 'key is required'
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: 'value is required'
    }
});
exports.default = customAttributeSchema;
