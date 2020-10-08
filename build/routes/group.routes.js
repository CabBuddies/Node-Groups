"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_library_1 = require("node-library");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.Router();
const controller = new controllers_1.GroupController();
const authorService = (controller.service);
const validatorMiddleware = new node_library_1.Middlewares.ValidatorMiddleware();
const schema = {
    "type": "object",
    "additionalProperties": false,
    "required": ["title", "description"],
    "properties": {
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "displayPicture": {
            "type": "string"
        },
        "customAttributes": {
            "type": "object"
        }
    }
};
router.post('/', node_library_1.Middlewares.authCheck(true), validatorMiddleware.validateRequestBody(schema), controller.create);
router.get('/', node_library_1.Middlewares.authCheck(false), controller.getAll);
router.get('/:id', node_library_1.Middlewares.authCheck(false), controller.get);
router.put('/:id', node_library_1.Middlewares.authCheck(true), middlewares_1.isAuthor(authorService), validatorMiddleware.validateRequestBody(schema), controller.update);
router.delete('/:id', node_library_1.Middlewares.authCheck(true), middlewares_1.isAuthor(authorService), controller.delete);
exports.default = router;
