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
const repositories_1 = require("../repositories");
const node_library_1 = require("node-library");
const binder_helper_1 = require("../helpers/binder.helper");
class UserService extends node_library_1.Services.BaseService {
    constructor() {
        super(new repositories_1.UserRepository());
        this.getUsersByUserIds = (userIds) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getUsersByUserIds(userIds);
        });
        node_library_1.Services.Binder.bindFunction(binder_helper_1.BinderNames.USER.EXTRACT.USER_PROFILES, this.getUsersByUserIds);
    }
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
}
exports.default = UserService.getInstance();
