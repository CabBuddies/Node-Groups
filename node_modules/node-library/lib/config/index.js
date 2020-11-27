"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesList = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.MONGO_URI_UM = exports.MONGO_URI = exports.PORT = void 0;
const routes_list_1 = require("./routes.list");
exports.routesList = routes_list_1.default;
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const PORT = process.env.PORT;
exports.PORT = PORT;
const MONGO_URI = process.env.MONGO_URI;
exports.MONGO_URI = MONGO_URI;
const MONGO_URI_UM = process.env.MONGO_URI_UM;
exports.MONGO_URI_UM = MONGO_URI_UM;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
exports.REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;
