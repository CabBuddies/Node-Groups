"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const stats_repository_1 = require("./stats.repository");
class PostRepository extends stats_repository_1.default {
    constructor() {
        super(models_1.Post);
    }
}
exports.default = PostRepository;
