"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const node_library_1 = require("node-library");
const controllers_1 = require("../controllers");
const router = express_1.Router();
exports.router = router;
const userController = new controllers_1.UserController();
//router.post('/',LoggerMiddleware('v1'),userController.create)
router.get('/', node_library_1.Middlewares.authCheck(false), userController.getAll);
router.get('/me', node_library_1.Middlewares.authCheck(true), userController.getMe);
router.get('/:email', node_library_1.Middlewares.authCheck(false), userController.getEmail);
router.delete('/delete_all', userController.deleteAll);
