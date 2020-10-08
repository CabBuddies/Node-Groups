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
const author_service_1 = require("./author.service");
class StatsService extends author_service_1.default {
    constructor(repository) {
        super(repository);
        this.updateStat = (request, entityId, statType, increase) => __awaiter(this, void 0, void 0, function* () {
            console.log('updateStat', entityId, statType, increase);
            return yield this.repository.updateStat(entityId, statType, increase);
        });
        this.opinionCreated = (request, data, entityAttribute) => __awaiter(this, void 0, void 0, function* () {
            console.log('opinionCreated', data, entityAttribute);
            if (!data[entityAttribute])
                return;
            return yield this.updateStat(request, data[entityAttribute], data['opinionType'] + 'Count', true);
        });
        this.opinionDeleted = (request, data, entityAttribute) => __awaiter(this, void 0, void 0, function* () {
            console.log('opinionCreated', data, entityAttribute);
            if (!data[entityAttribute])
                return;
            return yield this.updateStat(request, data[entityAttribute], data['opinionType'] + 'Count', false);
        });
    }
}
exports.default = StatsService;
