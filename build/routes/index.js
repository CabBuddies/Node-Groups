"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = exports.AuthRoutes = void 0;
const auth_routes_1 = require("./auth.routes");
Object.defineProperty(exports, "AuthRoutes", { enumerable: true, get: function () { return auth_routes_1.router; } });
const user_routes_1 = require("./user.routes");
Object.defineProperty(exports, "UserRoutes", { enumerable: true, get: function () { return user_routes_1.router; } });
