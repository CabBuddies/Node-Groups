"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const author_repository_1 = require("./author.repository");
class ReplyRepository extends author_repository_1.default {
    constructor() {
        super(models_1.Reply);
    }
}
exports.default = ReplyRepository;
