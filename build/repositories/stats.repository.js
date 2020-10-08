"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const author_repository_1 = require("./author.repository");
class StatsRepository extends author_repository_1.default {
    constructor(model) {
        super(model);
        this.updateStat = (entityId, property, increase) => __awaiter(this, void 0, void 0, function* () {
            const query = {};
            query["stats." + property] = increase ? 1 : -1;
            return yield this.model.findOneAndUpdate({ _id: entityId }, { $inc: query }, { new: true });
        });
    }
}
exports.default = StatsRepository;
