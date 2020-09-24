"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
    },
    password: {
        type: String,
        trim: true,
        required: 'Password is required',
    },
    account: {
        type: {
            type: String,
            enum: ['InApp', 'Google', 'Facebook', 'Twitter', 'LinkedIn'],
            default: 'InApp'
        },
        registeredAt: {
            type: Date,
            default: Date.now
        },
        confirmedAt: {
            type: Date
        }
    }
});
authSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        error = new Error();
        error.status = 400;
        error.message = 'Email already exists.';
        next(error);
    }
    else {
        next(error);
    }
});
authSchema.index({ 'email': 1 }, { unique: true });
const Auth = mongoose.model('Auth', authSchema);
exports.default = Auth;
