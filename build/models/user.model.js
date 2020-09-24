"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
    },
    firstName: {
        type: String,
        trim: true,
        required: 'First Name is required!'
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Last Name is required!'
    },
    displayPicture: {
        type: String,
        trim: true,
        default: ''
    }
});
userSchema.post('save', function (error, doc, next) {
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
userSchema.index({ 'email': 1 }, { unique: true });
const User = mongoose.model('User', userSchema);
exports.default = User;
