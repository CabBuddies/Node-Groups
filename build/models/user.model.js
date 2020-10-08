"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const mongoose = require("mongoose");
const User = db_1.userDb.model('User', new mongoose.Schema({}, { strict: false }));
exports.default = User;
